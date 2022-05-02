import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Shop, ShopDocument } from "src/shops/shops.schema";
import { CreateProductDTO, UpdateProductDto } from "./dto/create-product.dto";
import { Product, ProductDocument } from "./products.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument> //private shopService: ShopsService
  ) {}

  async createProduct(productDto: CreateProductDTO) {
    const shop = await this.shopModel.findById(productDto.shop);
    const product = await this.productModel.create(productDto);
    shop.products.push(product._id);
    await shop.save();

    return product;
  }

  async updateProduct(productDto: UpdateProductDto) {
    const product = await this.productModel.updateOne(
      { _id: productDto.id },
      productDto.product
    );
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.deleteOne({ _id: id });
    return product;
  }

  async getListProducts(): Promise<ProductDocument[]> {
    const products = await this.productModel.find();
    return products;
  }

  async findProductById(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }
}
