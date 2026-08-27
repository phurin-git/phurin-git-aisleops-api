CREATE TYPE "MovementType" AS ENUM ('IN', 'OUT', 'ADJUSTMENT');

CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "unit" VARCHAR(30) NOT NULL DEFAULT 'pcs',
    "minimumStock" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "products_minimum_stock_non_negative" CHECK ("minimumStock" >= 0)
);

CREATE TABLE "inventory_balances" (
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    CONSTRAINT "inventory_balances_pkey" PRIMARY KEY ("productId"),
    CONSTRAINT "inventory_quantity_non_negative" CHECK ("quantity" >= 0)
);

CREATE TABLE "stock_movements" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "type" "MovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "balanceBefore" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "reference" VARCHAR(120),
    "note" TEXT,
    "idempotencyKey" UUID NOT NULL,
    "createdBy" VARCHAR(120),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "stock_movement_quantity_positive" CHECK ("quantity" > 0),
    CONSTRAINT "stock_movement_balances_non_negative" CHECK ("balanceBefore" >= 0 AND "balanceAfter" >= 0)
);

CREATE UNIQUE INDEX "products_code_key" ON "products"("code");
CREATE INDEX "products_name_idx" ON "products"("name");
CREATE UNIQUE INDEX "stock_movements_idempotencyKey_key" ON "stock_movements"("idempotencyKey");
CREATE INDEX "stock_movements_productId_createdAt_idx" ON "stock_movements"("productId", "createdAt" DESC);
CREATE INDEX "stock_movements_createdAt_idx" ON "stock_movements"("createdAt" DESC);

ALTER TABLE "inventory_balances"
ADD CONSTRAINT "inventory_balances_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "stock_movements"
ADD CONSTRAINT "stock_movements_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
