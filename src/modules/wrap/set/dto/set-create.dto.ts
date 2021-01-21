import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SetCreateDto {

  @IsString()
  setType: string;

  // ==========================================================

  @IsString()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  // ==========================================================

  @IsString()
  @IsOptional()
  description: string | '';

  // ==========================================================

  @IsOptional()
  @IsArray()
  units?: number[];

  // ==================================================

  @IsIn([0, 1])
  active: number;

  // ==================================================

  @IsString()
  @IsOptional()
  image: string;
}
