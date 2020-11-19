import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(45)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(250)
  @IsOptional()
  password?: string;

  @IsIn([0, 1], {})
  active: number;

  @IsString()
  @IsEnum(UserRole, {})
  role: UserRole;
}
