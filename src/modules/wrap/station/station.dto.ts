import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class StationDto {

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

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