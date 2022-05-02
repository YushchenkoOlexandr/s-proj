import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/products.schema";

export type ShopDocument = Shop & mongoose.Document;

@Schema()
export class Shop {
  @Prop({ require: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  })
  products: Product[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
