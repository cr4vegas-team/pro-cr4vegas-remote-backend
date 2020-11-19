import { UserRole } from './../user-role.enum';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(250)
  password: string;

  @IsIn([0, 1], {})
  active: number;

  @IsString()
  @IsEnum(UserRole, {})
  role: UserRole;
}
