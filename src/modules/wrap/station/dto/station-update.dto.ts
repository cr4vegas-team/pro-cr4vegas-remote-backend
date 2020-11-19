import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class StationUpdateDto {
  @IsNumber()
  id: number;

  // =======================================

  @IsString()
  @MinLength(1)
  @MaxLength(5)
  code: string;

  // =======================================

  @IsString()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  // =======================================

  @IsString()
  @IsOptional()
  description: string;

  // =======================================

  @IsNumber()
  altitude: number;

  // =======================================

  @IsNumber()
  latitude: number;

  // =======================================

  @IsNumber()
  longitude: number;

  // ==================================================
  @IsIn([0, 1])
  active: number;

  // ==========================================================

  @IsOptional()
  @IsNumber({}, { each: true })
  units?: number[];

  // ==================================================

  @IsString()
  @IsOptional()
  image: string;
}
