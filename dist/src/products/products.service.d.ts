import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  create(dto: CreateProductDto): Promise<
    {
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
    } & {
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  >;
  findAll(
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<{
    items: ({
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
    } & {
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    })[];
    total: number;
    page: number;
    pageSize: number;
  }>;
  findByCode(code: string): Promise<
    {
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
    } & {
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  >;
  update(
    id: string,
    dto: UpdateProductDto,
  ): Promise<
    {
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
    } & {
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  >;
  setStatus(
    id: string,
    isActive: boolean,
  ): Promise<
    {
      inventory: {
        updatedAt: Date;
        quantity: number;
        productId: string;
      } | null;
    } & {
      name: string;
      id: string;
      code: string;
      description: string | null;
      unit: string;
      minimumStock: number;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  >;
  private ensureExists;
  private normalizeCode;
}
