import { ObjectId } from "mongoose";

export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  shop: ObjectId;
}

export class UpdateProductDto {
  id: string;
  product: { name: string; description: string; price: number };
}
