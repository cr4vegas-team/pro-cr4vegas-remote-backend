import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { SetTypeEntity } from "../set-type.entity";


export class SetCreateDto {

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

    @ApiProperty()
    @ValidateNested()
    setTypeName: SetTypeEntity;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

}