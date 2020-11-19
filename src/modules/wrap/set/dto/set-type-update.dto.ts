import { IsString } from 'class-validator';

export class SetTypeUpdateDto {
  @IsString()
  oldName: string;

  // =======================================

  @IsString()
  newName: string;
}
