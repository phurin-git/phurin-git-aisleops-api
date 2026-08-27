import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("DATABASE_URL is required");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const products = [
  { code: "WH-1001", name: "Safety Gloves", unit: "pair", minimumStock: 20 },
  { code: "WH-1002", name: "Packing Tape", unit: "roll", minimumStock: 15 },
  {
    code: "WH-1003",
    name: "Shipping Box — Medium",
    unit: "pcs",
    minimumStock: 25,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: product,
      create: { ...product, inventory: { create: { quantity: 0 } } },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
