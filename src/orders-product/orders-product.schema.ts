import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Order } from "src/orders/orders.schema";
import { Product } from "src/products/products.schema";

export type OrderProductDocument = OrderProduct & mongoose.Document;

@Schema()
export class OrderProduct {
  @Prop({ require: true, type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  prod: Product;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  })
  order: Order;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
