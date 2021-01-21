import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UnitTypeTableEnum } from '../unit-type.enum';

export class UnitCreateDto {
  @IsNumber()
  @IsPositive()
  code: number;

  // ==================================================

  @IsString()
  @IsEnum(UnitTypeTableEnum, {})
  unitTypeTable: UnitTypeTableEnum;

  // ==================================================

  @IsOptional()
  @IsNumber()
  sector?: number;

  // ==================================================

  @IsOptional()
  @IsNumber({}, { each: true })
  sets?: number[];

  // ==================================================

  @IsNumber()
  altitude: number;

  // ==================================================

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  // ==================================================

  @IsNumber()
  @Min(-90)
  @Max(90)
  longitude: number;

  // ==================================================

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

  // ==================================================
  
  @IsString()
  @IsOptional()
  name?: string;
}
