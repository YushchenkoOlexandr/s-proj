import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import { TokenModule } from 'src/token/token.module';
import { MailService } from './mail.service';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService],
  imports: [
      forwardRef(() => UsersModule),
      forwardRef(() => ShopsModule),
      JwtModule.register({}),
      TokenModule
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
