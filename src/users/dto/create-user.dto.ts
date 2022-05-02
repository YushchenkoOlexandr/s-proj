import { Role } from "src/utils/enum/roles.enum";

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: Role;
  isActivated: boolean;
  activationLink: string;
}

export class UpdateUserDto {
  email: string;
  password: string;
}
