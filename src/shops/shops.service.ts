import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Shop, ShopDocument } from "./shops.schema";
import { Model, ObjectId } from "mongoose";
import { CreateShopDTO } from "./dto/create-shop.dto";

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument>
  ) {}

  async createShop(shopDto: CreateShopDTO): Promise<Shop> {
    const shop = await this.shopModel.create(shopDto);
    return shop;
  }

  async updateShop(id: string, shopDto: CreateShopDTO): Promise<Shop> {
    const shop = await this.shopModel.findOneAndUpdate({ _id: id }, shopDto);
    return shop;
  }

  async deleteShop(id: string): Promise<any> {
    const shop = await this.shopModel.deleteOne({ _id: id });
    return shop;
  }

  async getListShops(): Promise<Shop[]> {
    const shops = await this.shopModel.find().populate("products");
    return shops;
  }

  async findShopById(id: ObjectId): Promise<Shop> {
    const shop = await this.shopModel.findById(id).populate("products");
    return shop;
  }
}
