import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsOptional, IsIn, ValidateNested } from "class-validator";
import { SetTypeEntity } from "./set-type.entity";


export class SetDto {

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

    @ApiProperty()
    @ValidateNested()
    setType: SetTypeEntity;

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