import {
  IsNumber,
  IsOptional,
  ValidateNested
} from 'class-validator';
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';

export class UnitStationPechinaUpdateDto {

  @IsNumber()
  id: number;

  @ValidateNested()
  unit: UnitUpdateDto;

  @IsNumber()
  @IsOptional()
  readingBatch: number;
}
