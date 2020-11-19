import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SectorCreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(5)
  code: string;

  // ==========================================================

  @IsOptional()
  @IsArray()
  units?: number[];

  // ==========================================================

  @IsString()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  // ==========================================================

  @IsOptional()
  @IsString()
  description?: string;

  // ==================================================

  @IsIn([0, 1])
  active: number;

  // ==================================================

  @IsString()
  @IsOptional()
  image: string;
}
