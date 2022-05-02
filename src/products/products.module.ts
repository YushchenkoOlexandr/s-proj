import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Shop, ShopSchema } from "src/shops/shops.schema";
import { TokenModule } from "src/token/token.module";
import { ProductsController } from "./products.controller";
import { Product, ProductSchema } from "./products.schema";
import { ProductsService } from "./products.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    forwardRef(() => AuthModule),
    TokenModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
