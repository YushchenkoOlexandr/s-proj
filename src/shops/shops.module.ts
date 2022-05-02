import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { ShopsController } from './shops.controller';
import { Shop, ShopSchema } from './shops.schema';
import { ShopsService } from './shops.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}]),
    forwardRef(() => AuthModule),
    TokenModule,
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService]
})
export class ShopsModule {}
