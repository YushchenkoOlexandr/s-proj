import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  OrderProduct,
  OrderProductSchema,
} from "src/orders-product/orders-product.schema";
import { OrdersController } from "./orders.controller";
import { Order, OrderSchema } from "./orders.schema";
import { OrdersService } from "./orders.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderProduct.name, schema: OrderProductSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
