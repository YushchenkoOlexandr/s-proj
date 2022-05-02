import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/utils/enum/roles.enum";

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ require: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop({ default: Role.CLIENT })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
