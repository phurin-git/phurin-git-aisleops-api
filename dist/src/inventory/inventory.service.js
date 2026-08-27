"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = class InventoryService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
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
  async lookup(code) {
    const product = await this.prisma.product.findUnique({
      where: { code: this.normalizeCode(code) },
      include: { inventory: true },
    });
    if (!product)
      throw new common_1.NotFoundException(
        `Product code ${code} was not found`,
      );
    return {
      ...product,
      quantity: product.inventory?.quantity ?? 0,
      stockStatus: this.stockStatus(
        product.inventory?.quantity ?? 0,
        product.minimumStock,
      ),
    };
  }
  receive(dto) {
    return this.mutateStock(dto, client_1.MovementType.IN);
  }
  issue(dto) {
    return this.mutateStock(dto, client_1.MovementType.OUT);
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
  async mutateStock(dto, type) {
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
              throw new common_1.NotFoundException(
                `Product code ${dto.productCode} was not found`,
              );
            if (!product.isActive)
              throw new common_1.UnprocessableEntityException(
                "This product is inactive",
              );
            const before = product.inventory?.quantity ?? 0;
            let after;
            if (type === client_1.MovementType.OUT) {
              const changed = await tx.inventoryBalance.updateMany({
                where: {
                  productId: product.id,
                  quantity: { gte: dto.quantity },
                },
                data: { quantity: { decrement: dto.quantity } },
              });
              if (changed.count !== 1) {
                throw new common_1.UnprocessableEntityException(
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
          {
            isolationLevel:
              client_1.Prisma.TransactionIsolationLevel.Serializable,
          },
        );
      } catch (error) {
        if (
          error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034" &&
          attempt < 2
        )
          continue;
        if (
          error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
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
    throw new common_1.UnprocessableEntityException(
      "Inventory changed concurrently. Please scan again.",
    );
  }
  normalizeCode(code) {
    return code.trim().toUpperCase();
  }
  stockStatus(quantity, minimumStock) {
    if (quantity === 0) return "out";
    if (quantity <= minimumStock) return "low";
    return "available";
  }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService]),
  ],
  InventoryService,
);
//# sourceMappingURL=inventory.service.js.map
