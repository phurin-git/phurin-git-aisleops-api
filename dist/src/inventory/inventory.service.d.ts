import { MovementType } from "../../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { StockMovementDto } from "./dto/stock-movement.dto";
export declare class InventoryService {
  private readonly prisma;
  constructor(prisma: PrismaService);
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
    type: MovementType;
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
    type: MovementType;
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
      type: MovementType;
      balanceBefore: number;
      balanceAfter: number;
      createdBy: string | null;
    })[]
  >;
  private mutateStock;
  private normalizeCode;
  private stockStatus;
}
