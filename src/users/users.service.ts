import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "src/utils/enum/roles.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./users.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(id: string, payload: {}) {
    return this.userModel.updateOne({ _id: id }, payload);
  }

  async activate(activationLink: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new HttpException(
        "Неккоректная ссылка активации",
        HttpStatus.BAD_REQUEST
      );
    }
    user.isActivated = true;
    await user.save();
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async listClient(): Promise<UserDocument[]> {
    return this.userModel.find({ role: Role.CLIENT }).exec();
  }
}
