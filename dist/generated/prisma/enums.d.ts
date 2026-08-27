export declare const MovementType: {
  readonly IN: "IN";
  readonly OUT: "OUT";
  readonly ADJUSTMENT: "ADJUSTMENT";
};
export type MovementType = (typeof MovementType)[keyof typeof MovementType];
