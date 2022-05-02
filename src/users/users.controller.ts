import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/utils/enum/roles.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.schema";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/getAll")
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/get-all-client")
  async listClient(): Promise<User[]> {
    return this.usersService.listClient();
  }

  @Get("/activate/:activationLink")
  async activate(@Param("activationLink") activationLink: string) {
    return this.usersService.activate(activationLink);
  }
}
