import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';

export class UnitHydrantCreateDto {
  @ApiProperty()
  @ValidateNested()
  unit: UnitCreateDto;

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
