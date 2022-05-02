import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./orders.schema";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post("/create")
  async createShop(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(orderDto);
  }
}
