import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';

export class UnitPondUpdateDto {
  @IsNumber()
  id: number;

  // =======================================

  @ValidateNested()
  unit: UnitUpdateDto;

  // =======================================

  @IsNumber()
  @IsOptional()
  m3?: number;

  // =======================================

  @IsNumber()
  @IsOptional()
  height?: number;
}
