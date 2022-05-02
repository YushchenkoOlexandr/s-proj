import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/utils/enum/roles.enum";
import { CreateShopDTO, UpdateShopDto } from "./dto/create-shop.dto";
import { Shop } from "./shops.schema";
import { ShopsService } from "./shops.service";
import { ObjectId } from "mongoose";

@Controller("shops")
export class ShopsController {
  constructor(private shopService: ShopsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/create")
  async createShop(@Body() shopDto: CreateShopDTO): Promise<Shop> {
    return await this.shopService.createShop(shopDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/update")
  async updateShop(@Body() shop: UpdateShopDto): Promise<Shop> {
    return await this.shopService.updateShop(shop.id, shop.shop);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/delete")
  async deleteShop(@Body() id: string): Promise<any> {
    return await this.shopService.deleteShop(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/get-list")
  async getListShops(): Promise<Shop[]> {
    return await this.shopService.getListShops();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/find-by-id/:id")
  async findShopById(@Param("id") id: ObjectId): Promise<Shop> {
    return await this.shopService.findShopById(id);
  }
}
