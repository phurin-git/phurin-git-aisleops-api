"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
  previewFeatures: [],
  clientVersion: "7.10.0",
  engineVersion: "0edf323efd1d98336f3f0a68684b56f689b900d3",
  activeProvider: "postgresql",
  inlineSchema:
    'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum MovementType {\n  IN\n  OUT\n  ADJUSTMENT\n}\n\nmodel Product {\n  id           String            @id @default(uuid()) @db.Uuid\n  code         String            @unique @db.VarChar(100)\n  name         String            @db.VarChar(200)\n  description  String?\n  unit         String            @default("pcs") @db.VarChar(30)\n  minimumStock Int               @default(0)\n  isActive     Boolean           @default(true)\n  createdAt    DateTime          @default(now()) @db.Timestamptz(3)\n  updatedAt    DateTime          @updatedAt @db.Timestamptz(3)\n  inventory    InventoryBalance?\n  movements    StockMovement[]\n\n  @@index([name])\n  @@map("products")\n}\n\nmodel InventoryBalance {\n  productId String   @id @db.Uuid\n  quantity  Int      @default(0)\n  updatedAt DateTime @updatedAt @db.Timestamptz(3)\n  product   Product  @relation(fields: [productId], references: [id], onDelete: Restrict)\n\n  @@map("inventory_balances")\n}\n\nmodel StockMovement {\n  id             String       @id @default(uuid()) @db.Uuid\n  productId      String       @db.Uuid\n  type           MovementType\n  quantity       Int\n  balanceBefore  Int\n  balanceAfter   Int\n  reference      String?      @db.VarChar(120)\n  note           String?\n  idempotencyKey String       @unique @db.Uuid\n  createdBy      String?      @db.VarChar(120)\n  createdAt      DateTime     @default(now()) @db.Timestamptz(3)\n  product        Product      @relation(fields: [productId], references: [id], onDelete: Restrict)\n\n  @@index([productId, createdAt(sort: Desc)])\n  @@index([createdAt(sort: Desc)])\n  @@map("stock_movements")\n}\n',
  runtimeDataModel: {
    models: {},
    enums: {},
    types: {},
  },
  parameterizationSchema: {
    strings: [],
    graph: "",
  },
};
config.runtimeDataModel = JSON.parse(
  '{"models":{"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"unit","kind":"scalar","type":"String"},{"name":"minimumStock","kind":"scalar","type":"Int"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"inventory","kind":"object","type":"InventoryBalance","relationName":"InventoryBalanceToProduct"},{"name":"movements","kind":"object","type":"StockMovement","relationName":"ProductToStockMovement"}],"dbName":"products","schema":null},"InventoryBalance":{"fields":[{"name":"productId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"product","kind":"object","type":"Product","relationName":"InventoryBalanceToProduct"}],"dbName":"inventory_balances","schema":null},"StockMovement":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"productId","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"MovementType"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"balanceBefore","kind":"scalar","type":"Int"},{"name":"balanceAfter","kind":"scalar","type":"Int"},{"name":"reference","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"idempotencyKey","kind":"scalar","type":"String"},{"name":"createdBy","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"product","kind":"object","type":"Product","relationName":"ProductToStockMovement"}],"dbName":"stock_movements","schema":null}},"enums":{},"types":{}}',
);
config.parameterizationSchema = {
  strings: JSON.parse(
    '["where","product","inventory","orderBy","cursor","movements","_count","Product.findUnique","Product.findUniqueOrThrow","Product.findFirst","Product.findFirstOrThrow","Product.findMany","data","Product.createOne","Product.createMany","Product.createManyAndReturn","Product.updateOne","Product.updateMany","Product.updateManyAndReturn","create","update","Product.upsertOne","Product.deleteOne","Product.deleteMany","having","_avg","_sum","_min","_max","Product.groupBy","Product.aggregate","InventoryBalance.findUnique","InventoryBalance.findUniqueOrThrow","InventoryBalance.findFirst","InventoryBalance.findFirstOrThrow","InventoryBalance.findMany","InventoryBalance.createOne","InventoryBalance.createMany","InventoryBalance.createManyAndReturn","InventoryBalance.updateOne","InventoryBalance.updateMany","InventoryBalance.updateManyAndReturn","InventoryBalance.upsertOne","InventoryBalance.deleteOne","InventoryBalance.deleteMany","InventoryBalance.groupBy","InventoryBalance.aggregate","StockMovement.findUnique","StockMovement.findUniqueOrThrow","StockMovement.findFirst","StockMovement.findFirstOrThrow","StockMovement.findMany","StockMovement.createOne","StockMovement.createMany","StockMovement.createManyAndReturn","StockMovement.updateOne","StockMovement.updateMany","StockMovement.updateManyAndReturn","StockMovement.upsertOne","StockMovement.deleteOne","StockMovement.deleteMany","StockMovement.groupBy","StockMovement.aggregate","AND","OR","NOT","id","productId","MovementType","type","quantity","balanceBefore","balanceAfter","reference","note","idempotencyKey","createdBy","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","updatedAt","code","name","description","unit","minimumStock","isActive","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]',
  ),
  graph:
    "sgEgMA4CAABxACAFAAByACA_AABsADBAAAALABBBAABsADBCAQAAAAFNQABkACFZQABkACFaAQAAAAFbAQBuACFcAQBvACFdAQBuACFeAgBjACFfIABwACEBAAAAAQAgBwEAAGUAID8AAGIAMEAAAAMAEEEAAGIAMEMBAG0AIUYCAGMAIVlAAGQAIQEAAAADACAPAQAAZQAgPwAAdAAwQAAABQAQQQAAdAAwQgEAbQAhQwEAbQAhRQAAdUUiRgIAYwAhRwIAYwAhSAIAYwAhSQEAbwAhSgEAbwAhSwEAbQAhTAEAbwAhTUAAZAAhBAEAAIoBACBJAAB2ACBKAAB2ACBMAAB2ACAPAQAAZQAgPwAAdAAwQAAABQAQQQAAdAAwQgEAAAABQwEAbQAhRQAAdUUiRgIAYwAhRwIAYwAhSAIAYwAhSQEAbwAhSgEAbwAhSwEAAAABTAEAbwAhTUAAZAAhAwAAAAUAIAMAAAYAMAQAAAcAIAEAAAAFACABAAAAAQAgDgIAAHEAIAUAAHIAID8AAGwAMEAAAAsAEEEAAGwAMEIBAG0AIU1AAGQAIVlAAGQAIVoBAG4AIVsBAG4AIVwBAG8AIV0BAG4AIV4CAGMAIV8gAHAAIQMCAACmAQAgBQAApwEAIFwAAHYAIAMAAAALACADAAAMADAEAAABACADAAAACwAgAwAADAAwBAAAAQAgAwAAAAsAIAMAAAwAMAQAAAEAIAsCAACkAQAgBQAApQEAIEIBAAAAAU1AAAAAAVlAAAAAAVoBAAAAAVsBAAAAAVwBAAAAAV0BAAAAAV4CAAAAAV8gAAAAAQEMAAAQACAJQgEAAAABTUAAAAABWUAAAAABWgEAAAABWwEAAAABXAEAAAABXQEAAAABXgIAAAABXyAAAAABAQwAABIAMAEMAAASADALAgAAkQEAIAUAAJIBACBCAQB8ACFNQACAAQAhWUAAgAEAIVoBAHwAIVsBAHwAIVwBAH8AIV0BAHwAIV4CAH4AIV8gAJABACECAAAAAQAgDAAAFQAgCUIBAHwAIU1AAIABACFZQACAAQAhWgEAfAAhWwEAfAAhXAEAfwAhXQEAfAAhXgIAfgAhXyAAkAEAIQIAAAALACAMAAAXACACAAAACwAgDAAAFwAgAwAAAAEAIBMAABAAIBQAABUAIAEAAAABACABAAAACwAgBgYAAIsBACAZAACMAQAgGgAAjwEAIBsAAI4BACAcAACNAQAgXAAAdgAgDD8AAGYAMEAAAB4AEEEAAGYAMEIBAFAAIU1AAFQAIVlAAFQAIVoBAGcAIVsBAGcAIVwBAFMAIV0BAGcAIV4CAFIAIV8gAGgAIQMAAAALACADAAAdADAYAAAeACADAAAACwAgAwAADAAwBAAAAQAgBwEAAGUAID8AAGIAMEAAAAMAEEEAAGIAMEMBAAAAAUYCAGMAIVlAAGQAIQEAAAAhACABAAAAIQAgAQEAAIoBACADAAAAAwAgAwAAJAAwBAAAIQAgAwAAAAMAIAMAACQAMAQAACEAIAMAAAADACADAAAkADAEAAAhACAEAQAAiQEAIEMBAAAAAUYCAAAAAVlAAAAAAQEMAAAoACADQwEAAAABRgIAAAABWUAAAAABAQwAACoAMAEMAAAqADAEAQAAiAEAIEMBAHwAIUYCAH4AIVlAAIABACECAAAAIQAgDAAALQAgA0MBAHwAIUYCAH4AIVlAAIABACECAAAAAwAgDAAALwAgAgAAAAMAIAwAAC8AIAMAAAAhACATAAAoACAUAAAtACABAAAAIQAgAQAAAAMAIAUGAACDAQAgGQAAhAEAIBoAAIcBACAbAACGAQAgHAAAhQEAIAY_AABhADBAAAA2ABBBAABhADBDAQBQACFGAgBSACFZQABUACEDAAAAAwAgAwAANQAwGAAANgAgAwAAAAMAIAMAACQAMAQAACEAIAEAAAAHACABAAAABwAgAwAAAAUAIAMAAAYAMAQAAAcAIAMAAAAFACADAAAGADAEAAAHACADAAAABQAgAwAABgAwBAAABwAgDAEAAIIBACBCAQAAAAFDAQAAAAFFAAAARQJGAgAAAAFHAgAAAAFIAgAAAAFJAQAAAAFKAQAAAAFLAQAAAAFMAQAAAAFNQAAAAAEBDAAAPgAgC0IBAAAAAUMBAAAAAUUAAABFAkYCAAAAAUcCAAAAAUgCAAAAAUkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU1AAAAAAQEMAABAADABDAAAQAAwDAEAAIEBACBCAQB8ACFDAQB8ACFFAAB9RSJGAgB-ACFHAgB-ACFIAgB-ACFJAQB_ACFKAQB_ACFLAQB8ACFMAQB_ACFNQACAAQAhAgAAAAcAIAwAAEMAIAtCAQB8ACFDAQB8ACFFAAB9RSJGAgB-ACFHAgB-ACFIAgB-ACFJAQB_ACFKAQB_ACFLAQB8ACFMAQB_ACFNQACAAQAhAgAAAAUAIAwAAEUAIAIAAAAFACAMAABFACADAAAABwAgEwAAPgAgFAAAQwAgAQAAAAcAIAEAAAAFACAIBgAAdwAgGQAAeAAgGgAAewAgGwAAegAgHAAAeQAgSQAAdgAgSgAAdgAgTAAAdgAgDj8AAE8AMEAAAEwAEEEAAE8AMEIBAFAAIUMBAFAAIUUAAFFFIkYCAFIAIUcCAFIAIUgCAFIAIUkBAFMAIUoBAFMAIUsBAFAAIUwBAFMAIU1AAFQAIQMAAAAFACADAABLADAYAABMACADAAAABQAgAwAABgAwBAAABwAgDj8AAE8AMEAAAEwAEEEAAE8AMEIBAFAAIUMBAFAAIUUAAFFFIkYCAFIAIUcCAFIAIUgCAFIAIUkBAFMAIUoBAFMAIUsBAFAAIUwBAFMAIU1AAFQAIQsGAABWACAbAABgACAcAABgACBOAQAAAAFPAQAAAARQAQAAAARRAQAAAAFSAQAAAAFTAQAAAAFUAQAAAAFVAQBfACEHBgAAVgAgGwAAXgAgHAAAXgAgTgAAAEUCTwAAAEUIUAAAAEUIVQAAXUUiDQYAAFYAIBkAAFwAIBoAAFYAIBsAAFYAIBwAAFYAIE4CAAAAAU8CAAAABFACAAAABFECAAAAAVICAAAAAVMCAAAAAVQCAAAAAVUCAFsAIQ4GAABZACAbAABaACAcAABaACBOAQAAAAFPAQAAAAVQAQAAAAVRAQAAAAFSAQAAAAFTAQAAAAFUAQAAAAFVAQBYACFWAQAAAAFXAQAAAAFYAQAAAAELBgAAVgAgGwAAVwAgHAAAVwAgTkAAAAABT0AAAAAEUEAAAAAEUUAAAAABUkAAAAABU0AAAAABVEAAAAABVUAAVQAhCwYAAFYAIBsAAFcAIBwAAFcAIE5AAAAAAU9AAAAABFBAAAAABFFAAAAAAVJAAAAAAVNAAAAAAVRAAAAAAVVAAFUAIQhOAgAAAAFPAgAAAARQAgAAAARRAgAAAAFSAgAAAAFTAgAAAAFUAgAAAAFVAgBWACEITkAAAAABT0AAAAAEUEAAAAAEUUAAAAABUkAAAAABU0AAAAABVEAAAAABVUAAVwAhDgYAAFkAIBsAAFoAIBwAAFoAIE4BAAAAAU8BAAAABVABAAAABVEBAAAAAVIBAAAAAVMBAAAAAVQBAAAAAVUBAFgAIVYBAAAAAVcBAAAAAVgBAAAAAQhOAgAAAAFPAgAAAAVQAgAAAAVRAgAAAAFSAgAAAAFTAgAAAAFUAgAAAAFVAgBZACELTgEAAAABTwEAAAAFUAEAAAAFUQEAAAABUgEAAAABUwEAAAABVAEAAAABVQEAWgAhVgEAAAABVwEAAAABWAEAAAABDQYAAFYAIBkAAFwAIBoAAFYAIBsAAFYAIBwAAFYAIE4CAAAAAU8CAAAABFACAAAABFECAAAAAVICAAAAAVMCAAAAAVQCAAAAAVUCAFsAIQhOCAAAAAFPCAAAAARQCAAAAARRCAAAAAFSCAAAAAFTCAAAAAFUCAAAAAFVCABcACEHBgAAVgAgGwAAXgAgHAAAXgAgTgAAAEUCTwAAAEUIUAAAAEUIVQAAXUUiBE4AAABFAk8AAABFCFAAAABFCFUAAF5FIgsGAABWACAbAABgACAcAABgACBOAQAAAAFPAQAAAARQAQAAAARRAQAAAAFSAQAAAAFTAQAAAAFUAQAAAAFVAQBfACELTgEAAAABTwEAAAAEUAEAAAAEUQEAAAABUgEAAAABUwEAAAABVAEAAAABVQEAYAAhVgEAAAABVwEAAAABWAEAAAABBj8AAGEAMEAAADYAEEEAAGEAMEMBAFAAIUYCAFIAIVlAAFQAIQcBAABlACA_AABiADBAAAADABBBAABiADBDAQBtACFGAgBjACFZQABkACEITgIAAAABTwIAAAAEUAIAAAAEUQIAAAABUgIAAAABUwIAAAABVAIAAAABVQIAVgAhCE5AAAAAAU9AAAAABFBAAAAABFFAAAAAAVJAAAAAAVNAAAAAAVRAAAAAAVVAAFcAIRACAABxACAFAAByACA_AABsADBAAAALABBBAABsADBCAQBtACFNQABkACFZQABkACFaAQBuACFbAQBuACFcAQBvACFdAQBuACFeAgBjACFfIABwACFjAAALACBkAAALACAMPwAAZgAwQAAAHgAQQQAAZgAwQgEAUAAhTUAAVAAhWUAAVAAhWgEAZwAhWwEAZwAhXAEAUwAhXQEAZwAhXgIAUgAhXyAAaAAhDgYAAFYAIBsAAGAAIBwAAGAAIE4BAAAAAU8BAAAABFABAAAABFEBAAAAAVIBAAAAAVMBAAAAAVQBAAAAAVUBAGsAIVYBAAAAAVcBAAAAAVgBAAAAAQUGAABWACAbAABqACAcAABqACBOIAAAAAFVIABpACEFBgAAVgAgGwAAagAgHAAAagAgTiAAAAABVSAAaQAhAk4gAAAAAVUgAGoAIQ4GAABWACAbAABgACAcAABgACBOAQAAAAFPAQAAAARQAQAAAARRAQAAAAFSAQAAAAFTAQAAAAFUAQAAAAFVAQBrACFWAQAAAAFXAQAAAAFYAQAAAAEOAgAAcQAgBQAAcgAgPwAAbAAwQAAACwAQQQAAbAAwQgEAbQAhTUAAZAAhWUAAZAAhWgEAbgAhWwEAbgAhXAEAbwAhXQEAbgAhXgIAYwAhXyAAcAAhCE4BAAAAAU8BAAAABFABAAAABFEBAAAAAVIBAAAAAVMBAAAAAVQBAAAAAVUBAHMAIQtOAQAAAAFPAQAAAARQAQAAAARRAQAAAAFSAQAAAAFTAQAAAAFUAQAAAAFVAQBgACFWAQAAAAFXAQAAAAFYAQAAAAELTgEAAAABTwEAAAAFUAEAAAAFUQEAAAABUgEAAAABUwEAAAABVAEAAAABVQEAWgAhVgEAAAABVwEAAAABWAEAAAABAk4gAAAAAVUgAGoAIQkBAABlACA_AABiADBAAAADABBBAABiADBDAQBtACFGAgBjACFZQABkACFjAAADACBkAAADACADYAAABQAgYQAABQAgYgAABQAgCE4BAAAAAU8BAAAABFABAAAABFEBAAAAAVIBAAAAAVMBAAAAAVQBAAAAAVUBAHMAIQ8BAABlACA_AAB0ADBAAAAFABBBAAB0ADBCAQBtACFDAQBtACFFAAB1RSJGAgBjACFHAgBjACFIAgBjACFJAQBvACFKAQBvACFLAQBtACFMAQBvACFNQABkACEETgAAAEUCTwAAAEUIUAAAAEUIVQAAXkUiAAAAAAAAAWgBAAAAAQFoAAAARQIFaAIAAAABbgIAAAABbwIAAAABcAIAAAABcQIAAAABAWgBAAAAAQFoQAAAAAEFEwAArgEAIBQAALEBACBlAACvAQAgZgAAsAEAIGsAAAEAIAMTAACuAQAgZQAArwEAIGsAAAEAIAAAAAAABRMAAKkBACAUAACsAQAgZQAAqgEAIGYAAKsBACBrAAABACADEwAAqQEAIGUAAKoBACBrAAABACADAgAApgEAIAUAAKcBACBcAAB2ACAAAAAAAAFoIAAAAAEHEwAAnwEAIBQAAKIBACBlAACgAQAgZgAAoQEAIGkAAAMAIGoAAAMAIGsAACEAIAsTAACTAQAwFAAAmAEAMGUAAJQBADBmAACVAQAwZwAAlgEAIGgAAJcBADBpAACXAQAwagAAlwEAMGsAAJcBADBsAACZAQAwbQAAmgEAMApCAQAAAAFFAAAARQJGAgAAAAFHAgAAAAFIAgAAAAFJAQAAAAFKAQAAAAFLAQAAAAFMAQAAAAFNQAAAAAECAAAABwAgEwAAngEAIAMAAAAHACATAACeAQAgFAAAnQEAIAEMAACoAQAwDwEAAGUAID8AAHQAMEAAAAUAEEEAAHQAMEIBAAAAAUMBAG0AIUUAAHVFIkYCAGMAIUcCAGMAIUgCAGMAIUkBAG8AIUoBAG8AIUsBAAAAAUwBAG8AIU1AAGQAIQIAAAAHACAMAACdAQAgAgAAAJsBACAMAACcAQAgDj8AAJoBADBAAACbAQAQQQAAmgEAMEIBAG0AIUMBAG0AIUUAAHVFIkYCAGMAIUcCAGMAIUgCAGMAIUkBAG8AIUoBAG8AIUsBAG0AIUwBAG8AIU1AAGQAIQ4_AACaAQAwQAAAmwEAEEEAAJoBADBCAQBtACFDAQBtACFFAAB1RSJGAgBjACFHAgBjACFIAgBjACFJAQBvACFKAQBvACFLAQBtACFMAQBvACFNQABkACEKQgEAfAAhRQAAfUUiRgIAfgAhRwIAfgAhSAIAfgAhSQEAfwAhSgEAfwAhSwEAfAAhTAEAfwAhTUAAgAEAIQpCAQB8ACFFAAB9RSJGAgB-ACFHAgB-ACFIAgB-ACFJAQB_ACFKAQB_ACFLAQB8ACFMAQB_ACFNQACAAQAhCkIBAAAAAUUAAABFAkYCAAAAAUcCAAAAAUgCAAAAAUkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU1AAAAAAQJGAgAAAAFZQAAAAAECAAAAIQAgEwAAnwEAIAMAAAADACATAACfAQAgFAAAowEAIAQAAAADACAMAACjAQAgRgIAfgAhWUAAgAEAIQJGAgB-ACFZQACAAQAhAxMAAJ8BACBlAACgAQAgawAAIQAgBBMAAJMBADBlAACUAQAwZwAAlgEAIGsAAJcBADABAQAAigEAIAAKQgEAAAABRQAAAEUCRgIAAAABRwIAAAABSAIAAAABSQEAAAABSgEAAAABSwEAAAABTAEAAAABTUAAAAABCgUAAKUBACBCAQAAAAFNQAAAAAFZQAAAAAFaAQAAAAFbAQAAAAFcAQAAAAFdAQAAAAFeAgAAAAFfIAAAAAECAAAAAQAgEwAAqQEAIAMAAAALACATAACpAQAgFAAArQEAIAwAAAALACAFAACSAQAgDAAArQEAIEIBAHwAIU1AAIABACFZQACAAQAhWgEAfAAhWwEAfAAhXAEAfwAhXQEAfAAhXgIAfgAhXyAAkAEAIQoFAACSAQAgQgEAfAAhTUAAgAEAIVlAAIABACFaAQB8ACFbAQB8ACFcAQB_ACFdAQB8ACFeAgB-ACFfIACQAQAhCgIAAKQBACBCAQAAAAFNQAAAAAFZQAAAAAFaAQAAAAFbAQAAAAFcAQAAAAFdAQAAAAFeAgAAAAFfIAAAAAECAAAAAQAgEwAArgEAIAMAAAALACATAACuAQAgFAAAsgEAIAwAAAALACACAACRAQAgDAAAsgEAIEIBAHwAIU1AAIABACFZQACAAQAhWgEAfAAhWwEAfAAhXAEAfwAhXQEAfAAhXgIAfgAhXyAAkAEAIQoCAACRAQAgQgEAfAAhTUAAgAEAIVlAAIABACFaAQB8ACFbAQB8ACFcAQB_ACFdAQB8ACFeAgB-ACFfIACQAQAhAwIEAgUIAwYABAEBAAEBAQABAQUJAAAAAAUGAAkZAAoaAAsbAAwcAA0AAAAAAAUGAAkZAAoaAAsbAAwcAA0BAQABAQEAAQUGABIZABMaABQbABUcABYAAAAAAAUGABIZABMaABQbABUcABYBAQABAQEAAQUGABsZABwaAB0bAB4cAB8AAAAAAAUGABsZABwaAB0bAB4cAB8HAgEICgEJDQEKDgELDwENEQEOEwUPFAYQFgERGAUSGQcVGgEWGwEXHAUdHwgeIA4fIgIgIwIhJQIiJgIjJwIkKQIlKwUmLA8nLgIoMAUpMRAqMgIrMwIsNAUtNxEuOBcvOQMwOgMxOwMyPAMzPQM0PwM1QQU2Qhg3RAM4RgU5Rxk6SAM7SQM8SgU9TRo-TiA",
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("node:buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () =>
    await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } =
      await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js",
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map
