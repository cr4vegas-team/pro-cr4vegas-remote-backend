import { ApiProperty } from '@nestjs/swagger';
import {
    IsIn,
    IsNumber,
    IsOptional,
    ValidateNested
} from 'class-validator';
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';

export class UnitHydrantUpdateDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  // =======================================

  @ApiProperty()
  @ValidateNested()
  unit: UnitUpdateDto;

  // =======================================

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  initBatch?: number;

  // =======================================

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  diameter?: number;

  // =======================================

  @ApiProperty()
  @IsIn([0, 1])
  @IsOptional()
  filter?: number;
}
