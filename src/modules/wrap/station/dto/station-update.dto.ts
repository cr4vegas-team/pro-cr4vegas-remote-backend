import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class StationUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number

    // =======================================

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    name: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    // =======================================

    @ApiProperty()
    @IsNumber()
    altitude: number;

    // =======================================

    @ApiProperty()
    @IsNumber()
    latitude: number;

    // =======================================

    @ApiProperty()
    @IsNumber()
    longitude: number;

}