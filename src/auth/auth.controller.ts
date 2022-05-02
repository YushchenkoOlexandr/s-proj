import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Role } from "src/utils/enum/roles.enum";
import { UserDocument } from "src/users/users.schema";
import { CreateUserDto, UpdateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const userData = await this.authService.login(
      userDto.email,
      userDto.password
    );
    this.saveTokenToCookie(res, userData.refreshToken);
    return userData;
  }

  @Post("/logout")
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = request.cookies.refreshToken;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie("refreshToken");

    return `Пользователь вышел. token deleted ${refreshToken}`;
  }

  @Post("/registration")
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.reg(userDto, res);
  }
  @Post("/admin-registration")
  async adminRegistration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const role: Role = Role.ADMIN;
    const userData = await this.reg(userDto, res, role);
    return userData;
  }

  async reg(userDto: CreateUserDto, res: Response, role: Role = Role.CLIENT) {
    userDto.role = role;
    const userData = await this.authService.registration(userDto);
    this.saveTokenToCookie(res, userData.refreshToken);
    return userData;
  }

  saveTokenToCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  @Get("/refresh-token")
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = request.cookies.refreshToken;
    const userData = await this.authService.refresh(refreshToken);
    this.saveTokenToCookie(res, userData.refreshToken);
    return userData;
  }

  @Post("/forgotPassword")
  async forgotPassword(
    @Body() forgotPasswordDto: UpdateUserDto
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post("/changePassword")
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() changePasswordDto: UpdateUserDto
  ): Promise<boolean> {
    return this.authService.changePassword(changePasswordDto);
  }
}
