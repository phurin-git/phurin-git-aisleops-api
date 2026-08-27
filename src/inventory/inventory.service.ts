import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { MovementType, Prisma } from "../../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { StockMovementDto } from "./dto/stock-movement.dto";

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(search = "", stockStatus = "all") {
    const query = search.trim();
    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(query
          ? {
              OR: [
                { code: { contains: query, mode: "insensitive" } },
                { name: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { inventory: true },
      orderBy: { updatedAt: "desc" },
    });

    const items = products.map((product) => ({
      ...product,
      quantity: product.inventory?.quantity ?? 0,
      stockStatus: this.stockStatus(
        product.inventory?.quantity ?? 0,
        product.minimumStock,
      ),
    }));
    const filtered =
      stockStatus === "all"
        ? items
        : items.filter((item) => item.stockStatus === stockStatus);

    return {
      summary: {
        products: items.length,
        units: items.reduce((sum, item) => sum + item.quantity, 0),
        lowStock: items.filter((item) => item.stockStatus === "low").length,
        outOfStock: items.filter((item) => item.stockStatus === "out").length,
      },
      items: filtered,
    };
  }

  async lookup(code: string) {
    const product = await this.prisma.product.findUnique({
      where: { code: this.normalizeCode(code) },
      include: { inventory: true },
    });
    if (!product)
      throw new NotFoundException(`Product code ${code} was not found`);
    return {
      ...product,
      quantity: product.inventory?.quantity ?? 0,
      stockStatus: this.stockStatus(
        product.inventory?.quantity ?? 0,
        product.minimumStock,
      ),
    };
  }

  receive(dto: StockMovementDto) {
    return this.mutateStock(dto, MovementType.IN);
  }

  issue(dto: StockMovementDto) {
    return this.mutateStock(dto, MovementType.OUT);
  }

  async movements(productCode = "", limit = 50) {
    return this.prisma.stockMovement.findMany({
      where: productCode
        ? { product: { code: this.normalizeCode(productCode) } }
        : {},
      include: { product: { select: { code: true, name: true, unit: true } } },
      orderBy: { createdAt: "desc" },
      take: Math.min(100, Math.max(1, limit)),
    });
  }

  private async mutateStock(dto: StockMovementDto, type: MovementType) {
    const existing = await this.prisma.stockMovement.findUnique({
      where: { idempotencyKey: dto.idempotencyKey },
      include: { product: true },
    });
    if (existing) return existing;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await this.prisma.$transaction(
          async (tx) => {
            const duplicate = await tx.stockMovement.findUnique({
              where: { idempotencyKey: dto.idempotencyKey },
            });
            if (duplicate) return duplicate;

            const product = await tx.product.findUnique({
              where: { code: this.normalizeCode(dto.productCode) },
              include: { inventory: true },
            });
            if (!product)
              throw new NotFoundException(
                `Product code ${dto.productCode} was not found`,
              );
            if (!product.isActive)
              throw new UnprocessableEntityException(
                "This product is inactive",
              );

            const before = product.inventory?.quantity ?? 0;
            let after: number;

            if (type === MovementType.OUT) {
              const changed = await tx.inventoryBalance.updateMany({
                where: {
                  productId: product.id,
                  quantity: { gte: dto.quantity },
                },
                data: { quantity: { decrement: dto.quantity } },
              });
              if (changed.count !== 1) {
                throw new UnprocessableEntityException(
                  `Insufficient stock. ${before} ${product.unit} available.`,
                );
              }
              after = before - dto.quantity;
            } else {
              await tx.inventoryBalance.upsert({
                where: { productId: product.id },
                create: { productId: product.id, quantity: dto.quantity },
                update: { quantity: { increment: dto.quantity } },
              });
              after = before + dto.quantity;
            }

            return tx.stockMovement.create({
              data: {
                productId: product.id,
                type,
                quantity: dto.quantity,
                balanceBefore: before,
                balanceAfter: after,
                reference: dto.reference?.trim() || null,
                note: dto.note?.trim() || null,
                idempotencyKey: dto.idempotencyKey,
              },
              include: { product: true },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034" &&
          attempt < 2
        )
          continue;
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          const duplicate = await this.prisma.stockMovement.findUnique({
            where: { idempotencyKey: dto.idempotencyKey },
            include: { product: true },
          });
          if (duplicate) return duplicate;
        }
        throw error;
      }
    }
    throw new UnprocessableEntityException(
      "Inventory changed concurrently. Please scan again.",
    );
  }

  private normalizeCode(code: string) {
    return code.trim().toUpperCase();
  }

  private stockStatus(quantity: number, minimumStock: number) {
    if (quantity === 0) return "out";
    if (quantity <= minimumStock) return "low";
    return "available";
  }
}
