import { UnprocessableEntityException } from "@nestjs/common";
import { MovementType } from "../../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { InventoryService } from "./inventory.service";

describe("InventoryService", () => {
  it("classifies overview balances without hiding zero stock", async () => {
    const prisma = {
      product: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: "1",
            code: "A",
            name: "Available",
            unit: "pcs",
            minimumStock: 5,
            isActive: true,
            inventory: { quantity: 10 },
          },
          {
            id: "2",
            code: "B",
            name: "Low",
            unit: "pcs",
            minimumStock: 5,
            isActive: true,
            inventory: { quantity: 3 },
          },
          {
            id: "3",
            code: "C",
            name: "Out",
            unit: "pcs",
            minimumStock: 5,
            isActive: true,
            inventory: { quantity: 0 },
          },
        ]),
      },
    } as unknown as PrismaService;
    const service = new InventoryService(prisma);

    const result = await service.overview();

    expect(result.summary).toEqual({
      products: 3,
      units: 13,
      lowStock: 1,
      outOfStock: 1,
    });
    expect(result.items.map((item) => item.stockStatus)).toEqual([
      "available",
      "low",
      "out",
    ]);
  });

  it("returns the original movement for a repeated idempotency key", async () => {
    const existing = {
      id: "movement-1",
      type: MovementType.IN,
      balanceAfter: 10,
    };
    const prisma = {
      stockMovement: { findUnique: jest.fn().mockResolvedValue(existing) },
      $transaction: jest.fn(),
    } as unknown as PrismaService;
    const service = new InventoryService(prisma);

    const result = await service.receive({
      productCode: "WH-1001",
      quantity: 10,
      idempotencyKey: "11111111-1111-4111-8111-111111111111",
    });

    expect(result).toBe(existing);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("rejects an issue that would make inventory negative", async () => {
    const tx = {
      stockMovement: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn(),
      },
      product: {
        findUnique: jest.fn().mockResolvedValue({
          id: "product-1",
          code: "WH-1001",
          name: "Gloves",
          unit: "pair",
          isActive: true,
          inventory: { quantity: 2 },
        }),
      },
      inventoryBalance: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const prisma = {
      stockMovement: { findUnique: jest.fn().mockResolvedValue(null) },
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) =>
        callback(tx),
      ),
    } as unknown as PrismaService;
    const service = new InventoryService(prisma);

    await expect(
      service.issue({
        productCode: "WH-1001",
        quantity: 3,
        idempotencyKey: "22222222-2222-4222-8222-222222222222",
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
    expect(tx.stockMovement.create).not.toHaveBeenCalled();
  });
});
