import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/products.schema";
import { Shop } from "src/shops/shops.schema";
import { OrderStatus } from "src/utils/enum/order-status.enum";

export type OrderDocument = Order & mongoose.Document;

@Schema()
export class Order {
  @Prop({ default: OrderStatus.CREATE })
  orderStatus: OrderStatus;

  @Prop()
  description: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Shop" })
  shop: Shop;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderProduct",
      },
    ],
  })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
