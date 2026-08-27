import * as runtime from "@prisma/client/runtime/index-browser";
export type * from "../models.js";
export type * from "./prismaNamespace.js";
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
  DbNull: new (secret: never) => typeof runtime.DbNull;
  JsonNull: new (secret: never) => typeof runtime.JsonNull;
  AnyNull: new (secret: never) => typeof runtime.AnyNull;
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
  readonly Product: "Product";
  readonly InventoryBalance: "InventoryBalance";
  readonly StockMovement: "StockMovement";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
  readonly ReadUncommitted: "ReadUncommitted";
  readonly ReadCommitted: "ReadCommitted";
  readonly RepeatableRead: "RepeatableRead";
  readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel =
  (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ProductScalarFieldEnum: {
  readonly id: "id";
  readonly code: "code";
  readonly name: "name";
  readonly description: "description";
  readonly unit: "unit";
  readonly minimumStock: "minimumStock";
  readonly isActive: "isActive";
  readonly createdAt: "createdAt";
  readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum =
  (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const InventoryBalanceScalarFieldEnum: {
  readonly productId: "productId";
  readonly quantity: "quantity";
  readonly updatedAt: "updatedAt";
};
export type InventoryBalanceScalarFieldEnum =
  (typeof InventoryBalanceScalarFieldEnum)[keyof typeof InventoryBalanceScalarFieldEnum];
export declare const StockMovementScalarFieldEnum: {
  readonly id: "id";
  readonly productId: "productId";
  readonly type: "type";
  readonly quantity: "quantity";
  readonly balanceBefore: "balanceBefore";
  readonly balanceAfter: "balanceAfter";
  readonly reference: "reference";
  readonly note: "note";
  readonly idempotencyKey: "idempotencyKey";
  readonly createdBy: "createdBy";
  readonly createdAt: "createdAt";
};
export type StockMovementScalarFieldEnum =
  (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum];
export declare const SortOrder: {
  readonly asc: "asc";
  readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
  readonly default: "default";
  readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
  readonly first: "first";
  readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
