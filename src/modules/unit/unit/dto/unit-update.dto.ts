import { UnitTypeTableEnum } from './../unit-type.enum';
import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UnitUpdateDto {
  @IsNumber()
  id: number;

  // ==================================================

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
  latitude: number;

  // ==================================================

  @IsNumber()
  longitude: number;

  // ==================================================

  @IsString()
  @IsOptional()
  description?: string;

  // ==================================================

  @IsString()
  @IsOptional()
  image: string;

  // ==================================================

  @IsIn([0, 1])
  active: number;

  // ==================================================

  @IsString()
  @IsOptional()
  name: string;
}
