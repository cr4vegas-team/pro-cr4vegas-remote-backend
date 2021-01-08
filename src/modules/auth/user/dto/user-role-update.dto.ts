import {
  IsEnum,
  IsNumber,
  IsString
} from 'class-validator';
import { UserRole } from '../user-role.enum';

export class UserRoleUpdateDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsEnum(UserRole, {})
  role: UserRole;
}
