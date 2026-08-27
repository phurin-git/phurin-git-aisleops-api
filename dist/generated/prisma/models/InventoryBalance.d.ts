import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InventoryBalanceModel =
  runtime.Types.Result.DefaultSelection<Prisma.$InventoryBalancePayload>;
export type AggregateInventoryBalance = {
  _count: InventoryBalanceCountAggregateOutputType | null;
  _avg: InventoryBalanceAvgAggregateOutputType | null;
  _sum: InventoryBalanceSumAggregateOutputType | null;
  _min: InventoryBalanceMinAggregateOutputType | null;
  _max: InventoryBalanceMaxAggregateOutputType | null;
};
export type InventoryBalanceAvgAggregateOutputType = {
  quantity: number | null;
};
export type InventoryBalanceSumAggregateOutputType = {
  quantity: number | null;
};
export type InventoryBalanceMinAggregateOutputType = {
  productId: string | null;
  quantity: number | null;
  updatedAt: Date | null;
};
export type InventoryBalanceMaxAggregateOutputType = {
  productId: string | null;
  quantity: number | null;
  updatedAt: Date | null;
};
export type InventoryBalanceCountAggregateOutputType = {
  productId: number;
  quantity: number;
  updatedAt: number;
  _all: number;
};
export type InventoryBalanceAvgAggregateInputType = {
  quantity?: true;
};
export type InventoryBalanceSumAggregateInputType = {
  quantity?: true;
};
export type InventoryBalanceMinAggregateInputType = {
  productId?: true;
  quantity?: true;
  updatedAt?: true;
};
export type InventoryBalanceMaxAggregateInputType = {
  productId?: true;
  quantity?: true;
  updatedAt?: true;
};
export type InventoryBalanceCountAggregateInputType = {
  productId?: true;
  quantity?: true;
  updatedAt?: true;
  _all?: true;
};
export type InventoryBalanceAggregateArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  where?: Prisma.InventoryBalanceWhereInput;
  orderBy?:
    | Prisma.InventoryBalanceOrderByWithRelationInput
    | Prisma.InventoryBalanceOrderByWithRelationInput[];
  cursor?: Prisma.InventoryBalanceWhereUniqueInput;
  take?: number;
  skip?: number;
  _count?: true | InventoryBalanceCountAggregateInputType;
  _avg?: InventoryBalanceAvgAggregateInputType;
  _sum?: InventoryBalanceSumAggregateInputType;
  _min?: InventoryBalanceMinAggregateInputType;
  _max?: InventoryBalanceMaxAggregateInputType;
};
export type GetInventoryBalanceAggregateType<
  T extends InventoryBalanceAggregateArgs,
> = {
  [P in keyof T & keyof AggregateInventoryBalance]: P extends "_count" | "count"
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateInventoryBalance[P]>
    : Prisma.GetScalarType<T[P], AggregateInventoryBalance[P]>;
};
export type InventoryBalanceGroupByArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  where?: Prisma.InventoryBalanceWhereInput;
  orderBy?:
    | Prisma.InventoryBalanceOrderByWithAggregationInput
    | Prisma.InventoryBalanceOrderByWithAggregationInput[];
  by:
    | Prisma.InventoryBalanceScalarFieldEnum[]
    | Prisma.InventoryBalanceScalarFieldEnum;
  having?: Prisma.InventoryBalanceScalarWhereWithAggregatesInput;
  take?: number;
  skip?: number;
  _count?: InventoryBalanceCountAggregateInputType | true;
  _avg?: InventoryBalanceAvgAggregateInputType;
  _sum?: InventoryBalanceSumAggregateInputType;
  _min?: InventoryBalanceMinAggregateInputType;
  _max?: InventoryBalanceMaxAggregateInputType;
};
export type InventoryBalanceGroupByOutputType = {
  productId: string;
  quantity: number;
  updatedAt: Date;
  _count: InventoryBalanceCountAggregateOutputType | null;
  _avg: InventoryBalanceAvgAggregateOutputType | null;
  _sum: InventoryBalanceSumAggregateOutputType | null;
  _min: InventoryBalanceMinAggregateOutputType | null;
  _max: InventoryBalanceMaxAggregateOutputType | null;
};
export type GetInventoryBalanceGroupByPayload<
  T extends InventoryBalanceGroupByArgs,
> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<InventoryBalanceGroupByOutputType, T["by"]> & {
      [
        P in keyof T & keyof InventoryBalanceGroupByOutputType
      ]: P extends "_count"
        ? T[P] extends boolean
          ? number
          : Prisma.GetScalarType<T[P], InventoryBalanceGroupByOutputType[P]>
        : Prisma.GetScalarType<T[P], InventoryBalanceGroupByOutputType[P]>;
    }
  >
>;
export type InventoryBalanceWhereInput = {
  AND?: Prisma.InventoryBalanceWhereInput | Prisma.InventoryBalanceWhereInput[];
  OR?: Prisma.InventoryBalanceWhereInput[];
  NOT?: Prisma.InventoryBalanceWhereInput | Prisma.InventoryBalanceWhereInput[];
  productId?: Prisma.UuidFilter<"InventoryBalance"> | string;
  quantity?: Prisma.IntFilter<"InventoryBalance"> | number;
  updatedAt?: Prisma.DateTimeFilter<"InventoryBalance"> | Date | string;
  product?: Prisma.XOR<
    Prisma.ProductScalarRelationFilter,
    Prisma.ProductWhereInput
  >;
};
export type InventoryBalanceOrderByWithRelationInput = {
  productId?: Prisma.SortOrder;
  quantity?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
  product?: Prisma.ProductOrderByWithRelationInput;
};
export type InventoryBalanceWhereUniqueInput = Prisma.AtLeast<
  {
    productId?: string;
    AND?:
      Prisma.InventoryBalanceWhereInput | Prisma.InventoryBalanceWhereInput[];
    OR?: Prisma.InventoryBalanceWhereInput[];
    NOT?:
      Prisma.InventoryBalanceWhereInput | Prisma.InventoryBalanceWhereInput[];
    quantity?: Prisma.IntFilter<"InventoryBalance"> | number;
    updatedAt?: Prisma.DateTimeFilter<"InventoryBalance"> | Date | string;
    product?: Prisma.XOR<
      Prisma.ProductScalarRelationFilter,
      Prisma.ProductWhereInput
    >;
  },
  "productId"
>;
export type InventoryBalanceOrderByWithAggregationInput = {
  productId?: Prisma.SortOrder;
  quantity?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
  _count?: Prisma.InventoryBalanceCountOrderByAggregateInput;
  _avg?: Prisma.InventoryBalanceAvgOrderByAggregateInput;
  _max?: Prisma.InventoryBalanceMaxOrderByAggregateInput;
  _min?: Prisma.InventoryBalanceMinOrderByAggregateInput;
  _sum?: Prisma.InventoryBalanceSumOrderByAggregateInput;
};
export type InventoryBalanceScalarWhereWithAggregatesInput = {
  AND?:
    | Prisma.InventoryBalanceScalarWhereWithAggregatesInput
    | Prisma.InventoryBalanceScalarWhereWithAggregatesInput[];
  OR?: Prisma.InventoryBalanceScalarWhereWithAggregatesInput[];
  NOT?:
    | Prisma.InventoryBalanceScalarWhereWithAggregatesInput
    | Prisma.InventoryBalanceScalarWhereWithAggregatesInput[];
  productId?: Prisma.UuidWithAggregatesFilter<"InventoryBalance"> | string;
  quantity?: Prisma.IntWithAggregatesFilter<"InventoryBalance"> | number;
  updatedAt?:
    Prisma.DateTimeWithAggregatesFilter<"InventoryBalance"> | Date | string;
};
export type InventoryBalanceCreateInput = {
  quantity?: number;
  updatedAt?: Date | string;
  product: Prisma.ProductCreateNestedOneWithoutInventoryInput;
};
export type InventoryBalanceUncheckedCreateInput = {
  productId: string;
  quantity?: number;
  updatedAt?: Date | string;
};
export type InventoryBalanceUpdateInput = {
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
  product?: Prisma.ProductUpdateOneRequiredWithoutInventoryNestedInput;
};
export type InventoryBalanceUncheckedUpdateInput = {
  productId?: Prisma.StringFieldUpdateOperationsInput | string;
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryBalanceCreateManyInput = {
  productId: string;
  quantity?: number;
  updatedAt?: Date | string;
};
export type InventoryBalanceUpdateManyMutationInput = {
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryBalanceUncheckedUpdateManyInput = {
  productId?: Prisma.StringFieldUpdateOperationsInput | string;
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryBalanceNullableScalarRelationFilter = {
  is?: Prisma.InventoryBalanceWhereInput | null;
  isNot?: Prisma.InventoryBalanceWhereInput | null;
};
export type InventoryBalanceCountOrderByAggregateInput = {
  productId?: Prisma.SortOrder;
  quantity?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
};
export type InventoryBalanceAvgOrderByAggregateInput = {
  quantity?: Prisma.SortOrder;
};
export type InventoryBalanceMaxOrderByAggregateInput = {
  productId?: Prisma.SortOrder;
  quantity?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
};
export type InventoryBalanceMinOrderByAggregateInput = {
  productId?: Prisma.SortOrder;
  quantity?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
};
export type InventoryBalanceSumOrderByAggregateInput = {
  quantity?: Prisma.SortOrder;
};
export type InventoryBalanceCreateNestedOneWithoutProductInput = {
  create?: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
  connectOrCreate?: Prisma.InventoryBalanceCreateOrConnectWithoutProductInput;
  connect?: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceUncheckedCreateNestedOneWithoutProductInput = {
  create?: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
  connectOrCreate?: Prisma.InventoryBalanceCreateOrConnectWithoutProductInput;
  connect?: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceUpdateOneWithoutProductNestedInput = {
  create?: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
  connectOrCreate?: Prisma.InventoryBalanceCreateOrConnectWithoutProductInput;
  upsert?: Prisma.InventoryBalanceUpsertWithoutProductInput;
  disconnect?: Prisma.InventoryBalanceWhereInput | boolean;
  delete?: Prisma.InventoryBalanceWhereInput | boolean;
  connect?: Prisma.InventoryBalanceWhereUniqueInput;
  update?: Prisma.XOR<
    Prisma.XOR<
      Prisma.InventoryBalanceUpdateToOneWithWhereWithoutProductInput,
      Prisma.InventoryBalanceUpdateWithoutProductInput
    >,
    Prisma.InventoryBalanceUncheckedUpdateWithoutProductInput
  >;
};
export type InventoryBalanceUncheckedUpdateOneWithoutProductNestedInput = {
  create?: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
  connectOrCreate?: Prisma.InventoryBalanceCreateOrConnectWithoutProductInput;
  upsert?: Prisma.InventoryBalanceUpsertWithoutProductInput;
  disconnect?: Prisma.InventoryBalanceWhereInput | boolean;
  delete?: Prisma.InventoryBalanceWhereInput | boolean;
  connect?: Prisma.InventoryBalanceWhereUniqueInput;
  update?: Prisma.XOR<
    Prisma.XOR<
      Prisma.InventoryBalanceUpdateToOneWithWhereWithoutProductInput,
      Prisma.InventoryBalanceUpdateWithoutProductInput
    >,
    Prisma.InventoryBalanceUncheckedUpdateWithoutProductInput
  >;
};
export type InventoryBalanceCreateWithoutProductInput = {
  quantity?: number;
  updatedAt?: Date | string;
};
export type InventoryBalanceUncheckedCreateWithoutProductInput = {
  quantity?: number;
  updatedAt?: Date | string;
};
export type InventoryBalanceCreateOrConnectWithoutProductInput = {
  where: Prisma.InventoryBalanceWhereUniqueInput;
  create: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
};
export type InventoryBalanceUpsertWithoutProductInput = {
  update: Prisma.XOR<
    Prisma.InventoryBalanceUpdateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedUpdateWithoutProductInput
  >;
  create: Prisma.XOR<
    Prisma.InventoryBalanceCreateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedCreateWithoutProductInput
  >;
  where?: Prisma.InventoryBalanceWhereInput;
};
export type InventoryBalanceUpdateToOneWithWhereWithoutProductInput = {
  where?: Prisma.InventoryBalanceWhereInput;
  data: Prisma.XOR<
    Prisma.InventoryBalanceUpdateWithoutProductInput,
    Prisma.InventoryBalanceUncheckedUpdateWithoutProductInput
  >;
};
export type InventoryBalanceUpdateWithoutProductInput = {
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryBalanceUncheckedUpdateWithoutProductInput = {
  quantity?: Prisma.IntFieldUpdateOperationsInput | number;
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InventoryBalanceSelect<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = runtime.Types.Extensions.GetSelect<
  {
    productId?: boolean;
    quantity?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
  },
  ExtArgs["result"]["inventoryBalance"]
>;
export type InventoryBalanceSelectCreateManyAndReturn<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = runtime.Types.Extensions.GetSelect<
  {
    productId?: boolean;
    quantity?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
  },
  ExtArgs["result"]["inventoryBalance"]
>;
export type InventoryBalanceSelectUpdateManyAndReturn<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = runtime.Types.Extensions.GetSelect<
  {
    productId?: boolean;
    quantity?: boolean;
    updatedAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
  },
  ExtArgs["result"]["inventoryBalance"]
>;
export type InventoryBalanceSelectScalar = {
  productId?: boolean;
  quantity?: boolean;
  updatedAt?: boolean;
};
export type InventoryBalanceOmit<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = runtime.Types.Extensions.GetOmit<
  "productId" | "quantity" | "updatedAt",
  ExtArgs["result"]["inventoryBalance"]
>;
export type InventoryBalanceInclude<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type InventoryBalanceIncludeCreateManyAndReturn<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type InventoryBalanceIncludeUpdateManyAndReturn<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $InventoryBalancePayload<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  name: "InventoryBalance";
  objects: {
    product: Prisma.$ProductPayload<ExtArgs>;
  };
  scalars: runtime.Types.Extensions.GetPayloadResult<
    {
      productId: string;
      quantity: number;
      updatedAt: Date;
    },
    ExtArgs["result"]["inventoryBalance"]
  >;
  composites: {};
};
export type InventoryBalanceGetPayload<
  S extends boolean | null | undefined | InventoryBalanceDefaultArgs,
> = runtime.Types.Result.GetResult<Prisma.$InventoryBalancePayload, S>;
export type InventoryBalanceCountArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = Omit<
  InventoryBalanceFindManyArgs,
  "select" | "include" | "distinct" | "omit"
> & {
  select?: InventoryBalanceCountAggregateInputType | true;
};
export interface InventoryBalanceDelegate<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
  GlobalOmitOptions = {},
> {
  [K: symbol]: {
    types: Prisma.TypeMap<ExtArgs>["model"]["InventoryBalance"];
    meta: {
      name: "InventoryBalance";
    };
  };
  findUnique<T extends InventoryBalanceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceFindUniqueArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "findUnique",
      GlobalOmitOptions
    > | null,
    null,
    ExtArgs,
    GlobalOmitOptions
  >;
  findUniqueOrThrow<T extends InventoryBalanceFindUniqueOrThrowArgs>(
    args: Prisma.SelectSubset<
      T,
      InventoryBalanceFindUniqueOrThrowArgs<ExtArgs>
    >,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "findUniqueOrThrow",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  findFirst<T extends InventoryBalanceFindFirstArgs>(
    args?: Prisma.SelectSubset<T, InventoryBalanceFindFirstArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "findFirst",
      GlobalOmitOptions
    > | null,
    null,
    ExtArgs,
    GlobalOmitOptions
  >;
  findFirstOrThrow<T extends InventoryBalanceFindFirstOrThrowArgs>(
    args?: Prisma.SelectSubset<
      T,
      InventoryBalanceFindFirstOrThrowArgs<ExtArgs>
    >,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "findFirstOrThrow",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  findMany<T extends InventoryBalanceFindManyArgs>(
    args?: Prisma.SelectSubset<T, InventoryBalanceFindManyArgs<ExtArgs>>,
  ): Prisma.PrismaPromise<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "findMany",
      GlobalOmitOptions
    >
  >;
  create<T extends InventoryBalanceCreateArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceCreateArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "create",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  createMany<T extends InventoryBalanceCreateManyArgs>(
    args?: Prisma.SelectSubset<T, InventoryBalanceCreateManyArgs<ExtArgs>>,
  ): Prisma.PrismaPromise<Prisma.BatchPayload>;
  createManyAndReturn<T extends InventoryBalanceCreateManyAndReturnArgs>(
    args?: Prisma.SelectSubset<
      T,
      InventoryBalanceCreateManyAndReturnArgs<ExtArgs>
    >,
  ): Prisma.PrismaPromise<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "createManyAndReturn",
      GlobalOmitOptions
    >
  >;
  delete<T extends InventoryBalanceDeleteArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceDeleteArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "delete",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  update<T extends InventoryBalanceUpdateArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceUpdateArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "update",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  deleteMany<T extends InventoryBalanceDeleteManyArgs>(
    args?: Prisma.SelectSubset<T, InventoryBalanceDeleteManyArgs<ExtArgs>>,
  ): Prisma.PrismaPromise<Prisma.BatchPayload>;
  updateMany<T extends InventoryBalanceUpdateManyArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceUpdateManyArgs<ExtArgs>>,
  ): Prisma.PrismaPromise<Prisma.BatchPayload>;
  updateManyAndReturn<T extends InventoryBalanceUpdateManyAndReturnArgs>(
    args: Prisma.SelectSubset<
      T,
      InventoryBalanceUpdateManyAndReturnArgs<ExtArgs>
    >,
  ): Prisma.PrismaPromise<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "updateManyAndReturn",
      GlobalOmitOptions
    >
  >;
  upsert<T extends InventoryBalanceUpsertArgs>(
    args: Prisma.SelectSubset<T, InventoryBalanceUpsertArgs<ExtArgs>>,
  ): Prisma.Prisma__InventoryBalanceClient<
    runtime.Types.Result.GetResult<
      Prisma.$InventoryBalancePayload<ExtArgs>,
      T,
      "upsert",
      GlobalOmitOptions
    >,
    never,
    ExtArgs,
    GlobalOmitOptions
  >;
  count<T extends InventoryBalanceCountArgs>(
    args?: Prisma.Subset<T, InventoryBalanceCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<"select", any>
      ? T["select"] extends true
        ? number
        : Prisma.GetScalarType<
            T["select"],
            InventoryBalanceCountAggregateOutputType
          >
      : number
  >;
  aggregate<T extends InventoryBalanceAggregateArgs>(
    args: Prisma.Subset<T, InventoryBalanceAggregateArgs>,
  ): Prisma.PrismaPromise<GetInventoryBalanceAggregateType<T>>;
  groupBy<
    T extends InventoryBalanceGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<"skip", Prisma.Keys<T>>,
      Prisma.Extends<"take", Prisma.Keys<T>>
    >,
    OrderByArg extends (Prisma.True extends HasSelectOrTake
      ? {
          orderBy: InventoryBalanceGroupByArgs["orderBy"];
        }
      : {
          orderBy?: InventoryBalanceGroupByArgs["orderBy"];
        }),
    OrderFields extends Prisma.ExcludeUnderscoreKeys<
      Prisma.Keys<Prisma.MaybeTupleToUnion<T["orderBy"]>>
    >,
    ByFields extends Prisma.MaybeTupleToUnion<T["by"]>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T["having"]>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends (T["by"] extends never[] ? Prisma.True : Prisma.False),
    InputErrors extends (ByEmpty extends Prisma.True
      ? `Error: "by" must not be empty.`
      : HavingValid extends Prisma.False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
                ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                : [
                    Error,
                    "Field ",
                    P,
                    ` in "having" needs to be provided in "by"`,
                  ];
          }[HavingFields]
        : "take" extends Prisma.Keys<T>
          ? "orderBy" extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
              ? {}
              : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
          : "skip" extends Prisma.Keys<T>
            ? "orderBy" extends Prisma.Keys<T>
              ? ByValid extends Prisma.True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "skip", you also need to provide "orderBy"'
            : ByValid extends Prisma.True
              ? {}
              : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                }[OrderFields]),
  >(
    args: Prisma.SubsetIntersection<
      T,
      InventoryBalanceGroupByArgs,
      OrderByArg
    > &
      InputErrors,
  ): {} extends InputErrors
    ? GetInventoryBalanceGroupByPayload<T>
    : Prisma.PrismaPromise<InputErrors>;
  readonly fields: InventoryBalanceFieldRefs;
}
export interface Prisma__InventoryBalanceClient<
  T,
  Null = never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
  GlobalOmitOptions = {},
> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise";
  product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(
    args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>,
  ): Prisma.Prisma__ProductClient<
    | runtime.Types.Result.GetResult<
        Prisma.$ProductPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >
    | Null,
    Null,
    ExtArgs,
    GlobalOmitOptions
  >;
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?:
      ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
  catch<TResult = never>(
    onrejected?:
      ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
  ): runtime.Types.Utils.JsPromise<T | TResult>;
  finally(
    onfinally?: (() => void) | undefined | null,
  ): runtime.Types.Utils.JsPromise<T>;
}
export interface InventoryBalanceFieldRefs {
  readonly productId: Prisma.FieldRef<"InventoryBalance", "String">;
  readonly quantity: Prisma.FieldRef<"InventoryBalance", "Int">;
  readonly updatedAt: Prisma.FieldRef<"InventoryBalance", "DateTime">;
}
export type InventoryBalanceFindUniqueArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceFindUniqueOrThrowArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceFindFirstArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where?: Prisma.InventoryBalanceWhereInput;
  orderBy?:
    | Prisma.InventoryBalanceOrderByWithRelationInput
    | Prisma.InventoryBalanceOrderByWithRelationInput[];
  cursor?: Prisma.InventoryBalanceWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?:
    | Prisma.InventoryBalanceScalarFieldEnum
    | Prisma.InventoryBalanceScalarFieldEnum[];
};
export type InventoryBalanceFindFirstOrThrowArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where?: Prisma.InventoryBalanceWhereInput;
  orderBy?:
    | Prisma.InventoryBalanceOrderByWithRelationInput
    | Prisma.InventoryBalanceOrderByWithRelationInput[];
  cursor?: Prisma.InventoryBalanceWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?:
    | Prisma.InventoryBalanceScalarFieldEnum
    | Prisma.InventoryBalanceScalarFieldEnum[];
};
export type InventoryBalanceFindManyArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where?: Prisma.InventoryBalanceWhereInput;
  orderBy?:
    | Prisma.InventoryBalanceOrderByWithRelationInput
    | Prisma.InventoryBalanceOrderByWithRelationInput[];
  cursor?: Prisma.InventoryBalanceWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?:
    | Prisma.InventoryBalanceScalarFieldEnum
    | Prisma.InventoryBalanceScalarFieldEnum[];
};
export type InventoryBalanceCreateArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  data: Prisma.XOR<
    Prisma.InventoryBalanceCreateInput,
    Prisma.InventoryBalanceUncheckedCreateInput
  >;
};
export type InventoryBalanceCreateManyArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  data:
    | Prisma.InventoryBalanceCreateManyInput
    | Prisma.InventoryBalanceCreateManyInput[];
  skipDuplicates?: boolean;
};
export type InventoryBalanceCreateManyAndReturnArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelectCreateManyAndReturn<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  data:
    | Prisma.InventoryBalanceCreateManyInput
    | Prisma.InventoryBalanceCreateManyInput[];
  skipDuplicates?: boolean;
  include?: Prisma.InventoryBalanceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InventoryBalanceUpdateArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  data: Prisma.XOR<
    Prisma.InventoryBalanceUpdateInput,
    Prisma.InventoryBalanceUncheckedUpdateInput
  >;
  where: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceUpdateManyArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  data: Prisma.XOR<
    Prisma.InventoryBalanceUpdateManyMutationInput,
    Prisma.InventoryBalanceUncheckedUpdateManyInput
  >;
  where?: Prisma.InventoryBalanceWhereInput;
  limit?: number;
};
export type InventoryBalanceUpdateManyAndReturnArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelectUpdateManyAndReturn<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  data: Prisma.XOR<
    Prisma.InventoryBalanceUpdateManyMutationInput,
    Prisma.InventoryBalanceUncheckedUpdateManyInput
  >;
  where?: Prisma.InventoryBalanceWhereInput;
  limit?: number;
  include?: Prisma.InventoryBalanceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InventoryBalanceUpsertArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where: Prisma.InventoryBalanceWhereUniqueInput;
  create: Prisma.XOR<
    Prisma.InventoryBalanceCreateInput,
    Prisma.InventoryBalanceUncheckedCreateInput
  >;
  update: Prisma.XOR<
    Prisma.InventoryBalanceUpdateInput,
    Prisma.InventoryBalanceUncheckedUpdateInput
  >;
};
export type InventoryBalanceDeleteArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
  where: Prisma.InventoryBalanceWhereUniqueInput;
};
export type InventoryBalanceDeleteManyArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  where?: Prisma.InventoryBalanceWhereInput;
  limit?: number;
};
export type InventoryBalanceDefaultArgs<
  ExtArgs extends runtime.Types.Extensions.InternalArgs =
    runtime.Types.Extensions.DefaultArgs,
> = {
  select?: Prisma.InventoryBalanceSelect<ExtArgs> | null;
  omit?: Prisma.InventoryBalanceOmit<ExtArgs> | null;
  include?: Prisma.InventoryBalanceInclude<ExtArgs> | null;
};
