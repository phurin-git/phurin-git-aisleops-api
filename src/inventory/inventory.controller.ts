import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { StockMovementDto } from "./dto/stock-movement.dto";
import { InventoryService } from "./inventory.service";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Get("overview")
  overview(
    @Query("search") search = "",
    @Query("stockStatus") stockStatus = "all",
  ) {
    return this.inventory.overview(search, stockStatus);
  }

  @Get("products/:code")
  lookup(@Param("code") code: string) {
    return this.inventory.lookup(code);
  }

  @Post("receipts")
  receive(@Body() dto: StockMovementDto) {
    return this.inventory.receive(dto);
  }

  @Post("issues")
  issue(@Body() dto: StockMovementDto) {
    return this.inventory.issue(dto);
  }

  @Get("movements")
  movements(
    @Query("productCode") productCode = "",
    @Query("limit", new ParseIntPipe({ optional: true })) limit = 50,
  ) {
    return this.inventory.movements(productCode, limit);
  }
}
