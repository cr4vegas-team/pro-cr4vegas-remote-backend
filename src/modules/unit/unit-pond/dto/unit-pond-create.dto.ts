import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';

export class UnitPondCreateDto {
  @ValidateNested()
  unit: UnitCreateDto;

  // =======================================

  @IsNumber()
  @IsOptional()
  m3?: number;

  // =======================================

  @IsNumber()
  @IsOptional()
  height?: number;
}
