import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  OrderProduct,
  OrderProductDocument,
} from "src/orders-product/orders-product.schema";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order, OrderDocument } from "./orders.schema";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderProduct.name)
    private readonly orderProductModel: Model<OrderProductDocument>
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const productFromDto = orderDto.products;
    orderDto.products = [];
    const order = await this.orderModel.create(orderDto);

    for (let index = 0; index < productFromDto.length; index++) {
      const element = productFromDto[index];

      const product = await this.orderProductModel.create({
        ...element,
        order: order._id,
      });
      order.products.push(product._id);
    }
    await order.save();

    console.log(order);

    return order;
  }
}
