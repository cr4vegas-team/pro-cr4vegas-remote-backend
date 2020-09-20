
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UnitCreateDto {

    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    station?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    sector?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { each: true })
    sets?: number[];

    @ApiProperty()
    @IsNumber()
    altitude: number;

    @ApiProperty()
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @ApiProperty()
    @IsNumber()
    @Min(-90)
    @Max(90)
    longitude: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

}