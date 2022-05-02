import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Shop } from "src/shops/shops.schema";

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop({ require: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  })
  shop: Shop;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
