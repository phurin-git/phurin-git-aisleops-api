import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
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
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("A product with this code already exists");
      }
      throw error;
    }
  }

  async findAll(search = "", page = 1, pageSize = 50) {
    const safePage = Math.max(1, page);
    const safeSize = Math.min(100, Math.max(1, pageSize));
    const query = search.trim();
    const where: Prisma.ProductWhereInput = query
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

  async findByCode(code: string) {
    const product = await this.prisma.product.findUnique({
      where: { code: this.normalizeCode(code) },
      include: { inventory: true },
    });
    if (!product)
      throw new NotFoundException(`Product code ${code} was not found`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
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
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("A product with this code already exists");
      }
      throw error;
    }
  }

  async setStatus(id: string, isActive: boolean) {
    await this.ensureExists(id);
    return this.prisma.product.update({
      where: { id },
      data: { isActive },
      include: { inventory: true },
    });
  }

  private async ensureExists(id: string) {
    if (!(await this.prisma.product.findUnique({ where: { id } }))) {
      throw new NotFoundException("Product was not found");
    }
  }

  private normalizeCode(code: string) {
    return code.trim().toUpperCase();
  }
}
