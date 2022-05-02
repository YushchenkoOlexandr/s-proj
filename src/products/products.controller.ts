import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/utils/enum/roles.enum";
import { ShopsService } from "src/shops/shops.service";
import { CreateProductDTO, UpdateProductDto } from "./dto/create-product.dto";
import { Product } from "./products.schema";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/create")
  async createProduct(@Body() productDto: CreateProductDTO): Promise<Product> {
    return await this.productService.createProduct(productDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/update")
  async updateProduct(@Body() product: UpdateProductDto): Promise<any> {
    return await this.productService.updateProduct(product);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/delete")
  async deleteProduct(@Body() id: string): Promise<any> {
    return await this.productService.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/get-list")
  async getListProducts(): Promise<Product[]> {
    return await this.productService.getListProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/find-by-id/:id")
  async findProductById(@Param("id") id: string): Promise<Product> {
    return await this.productService.findProductById(id);
  }
}
