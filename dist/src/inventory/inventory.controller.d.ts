import { StockMovementDto } from "./dto/stock-movement.dto";
import { InventoryService } from "./inventory.service";
export declare class InventoryController {
  private readonly inventory;
  constructor(inventory: InventoryService);
  overview(
    search?: string,
    stockStatus?: string,
  ): Promise<{
    summary: {
      products: number;
      units: number;
      lowStock: number;
      outOfStock: number;
    };
    items: {
      quantity: number;
      stockStatus: string;
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }>;
  lookup(code: string): Promise<{
    quantity: number;
    stockStatus: string;
    inventory: {
      updatedAt: Date;
      quantity: number;
      productId: string;
    } | null;
    name: string;
    id: string;
    code: string;
    description: string | null;
    unit: string;
    minimumStock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  receive(dto: StockMovementDto): Promise<{
    id: string;
    createdAt: Date;
    quantity: number;
    reference: string | null;
    note: string | null;
    idempotencyKey: string;
    productId: string;
    type: import("../../generated/prisma/enums").MovementType;
    balanceBefore: number;
    balanceAfter: number;
    createdBy: string | null;
  }>;
  issue(dto: StockMovementDto): Promise<{
    id: string;
    createdAt: Date;
    quantity: number;
    reference: string | null;
    note: string | null;
    idempotencyKey: string;
    productId: string;
    type: import("../../generated/prisma/enums").MovementType;
    balanceBefore: number;
    balanceAfter: number;
    createdBy: string | null;
  }>;
  movements(
    productCode?: string,
    limit?: number,
  ): Promise<
    ({
      product: {
        name: string;
        code: string;
        unit: string;
      };
    } & {
      id: string;
      createdAt: Date;
      quantity: number;
      reference: string | null;
      note: string | null;
      idempotencyKey: string;
      productId: string;
      type: import("../../generated/prisma/enums").MovementType;
      balanceBefore: number;
      balanceAfter: number;
      createdBy: string | null;
    })[]
  >;
}
