import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { MailService } from "../auth/mail.service";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { TokenService } from "src/token/token.service";
import { UserDocument } from "src/users/users.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService
  ) {}

  async registration(userDto: CreateUserDto) {
    const newUser = await this.userService.getUserByEmail(userDto.email);
    if (newUser) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(
      userDto.password,
      +process.env.SALT
    );
    const activationLink = randomUUID(); //.v4();

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      user.email,
      `${process.env.API_URL}/users/activate/${activationLink}`
    );
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return { user: user, ...tokens };
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        "Пользователь с таким email не найден",
        HttpStatus.BAD_REQUEST
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new HttpException("Неверный пароль", HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return { user: user, ...tokens };
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException("нет токена!!!", HttpStatus.BAD_REQUEST);
    }

    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new HttpException(
        "ошибка обработки рефреш токена!!!",
        HttpStatus.BAD_REQUEST
      );
    }
    const user = await this.userService.getUserById(userData._id);
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user._id, tokens.refreshToken);

    return { user: user, ...tokens };
  }

  //!!!!
  async forgotPassword(forgotPasswordDto: UpdateUserDto): Promise<void> {
    // const user = await this.userService.getUserByEmail(forgotPasswordDto.email);
    // if (!user) {
    //   throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST);
    // }
    // const token = await this.login(user.email, user.password);
    // const forgotLink = `${process.env.API_URL}/auth/forgotPassword?token=${token}`;

    // await this.mailService.sendActivationMail(
    //   user.email,
    //   `Please use this ${forgotLink} to reset your password.`
    // );
  }

  async changePassword(
    changePasswordDto: UpdateUserDto
  ): Promise<boolean> {
    const user =  await this.userService.getUserByEmail(changePasswordDto.email);
    const password = await bcrypt.hash(
      changePasswordDto.password,
      +process.env.SALT
    );
    await this.userService.update(user._id, { password });
    await this.tokenService.deleteAll(user._id);
    return true;
  }
}
