import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from "class-validator";

export class StockMovementDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim().toUpperCase() : value,
  )
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  productCode!: string;

  @IsInt()
  @Min(1)
  @Max(2_000_000_000)
  quantity!: number;

  @IsOptional()
  @IsString()
  @Length(0, 120)
  reference?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsUUID()
  idempotencyKey!: string;
}
