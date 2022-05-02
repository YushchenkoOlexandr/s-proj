import { ObjectId } from "mongoose";

export class CreateOrderProductDto {
  prod: ObjectId;
  quantity: number;
  price: number;
  order: ObjectId;
}
