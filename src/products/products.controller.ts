import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Get()
  findAll(
    @Query("search") search = "",
    @Query("page", new ParseIntPipe({ optional: true })) page = 1,
    @Query("pageSize", new ParseIntPipe({ optional: true })) pageSize = 50,
  ) {
    return this.products.findAll(search, page, pageSize);
  }

  @Get("code/:code")
  findByCode(@Param("code") code: string) {
    return this.products.findByCode(code);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto);
  }

  @Patch(":id/status")
  setStatus(
    @Param("id", ParseUUIDPipe) id: string,
    @Body("isActive", ParseBoolPipe) isActive: boolean,
  ) {
    return this.products.setStatus(id, isActive);
  }
}
