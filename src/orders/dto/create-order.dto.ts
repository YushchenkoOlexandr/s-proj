import { OrderStatus } from "src/utils/enum/order-status.enum";
import { ObjectId } from "mongoose";
import { CreateOrderProductDto } from "src/orders-product/dto/create-order-product.dto";

export class CreateOrderDto {
  orderStatus: OrderStatus;
  description: string;
  shop: ObjectId;
  products: ObjectId[];
}
