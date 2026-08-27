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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async create(dto) {
    try {
      return await this.prisma.product.create({
        data: {
          ...dto,
          code: this.normalizeCode(dto.code),
          inventory: { create: { quantity: 0 } },
        },
        include: { inventory: true },
      });
    } catch (error) {
      if (
        error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new common_1.ConflictException(
          "A product with this code already exists",
        );
      }
      throw error;
    }
  }
  async findAll(search = "", page = 1, pageSize = 50) {
    const safePage = Math.max(1, page);
    const safeSize = Math.min(100, Math.max(1, pageSize));
    const query = search.trim();
    const where = query
      ? {
          OR: [
            { code: { contains: query, mode: "insensitive" } },
            { name: { contains: query, mode: "insensitive" } },
          ],
        }
      : {};
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { inventory: true },
        orderBy: { name: "asc" },
        skip: (safePage - 1) * safeSize,
        take: safeSize,
      }),
      this.prisma.product.count({ where }),
    ]);
    return { items, total, page: safePage, pageSize: safeSize };
  }
  async findByCode(code) {
    const product = await this.prisma.product.findUnique({
      where: { code: this.normalizeCode(code) },
      include: { inventory: true },
    });
    if (!product)
      throw new common_1.NotFoundException(
        `Product code ${code} was not found`,
      );
    return product;
  }
  async update(id, dto) {
    await this.ensureExists(id);
    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          ...dto,
          code: dto.code ? this.normalizeCode(dto.code) : undefined,
        },
        include: { inventory: true },
      });
    } catch (error) {
      if (
        error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new common_1.ConflictException(
          "A product with this code already exists",
        );
      }
      throw error;
    }
  }
  async setStatus(id, isActive) {
    await this.ensureExists(id);
    return this.prisma.product.update({
      where: { id },
      data: { isActive },
      include: { inventory: true },
    });
  }
  async ensureExists(id) {
    if (!(await this.prisma.product.findUnique({ where: { id } }))) {
      throw new common_1.NotFoundException("Product was not found");
    }
  }
  normalizeCode(code) {
    return code.trim().toUpperCase();
  }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService]),
  ],
  ProductsService,
);
//# sourceMappingURL=products.service.js.map
