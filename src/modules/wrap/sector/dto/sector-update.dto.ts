import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SectorUpdateDto {
  @IsNumber()
  id: number;

  // =======================================

  @IsString()
  @MinLength(1)
  @MaxLength(5)
  code: string;

  // ==========================================================

  @IsOptional()
  @IsArray()
  units?: number[];

  // =======================================

  @IsString()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  // =======================================

  @IsString()
  @IsOptional()
  description?: string;

  // ==================================================

  @IsIn([0, 1])
  active: number;

  // ==================================================

  @IsString()
  @IsOptional()
  image: string;
}
