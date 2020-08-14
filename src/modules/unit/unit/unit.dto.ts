
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UnitDto {

    @ApiProperty()
    @IsOptional()
    stationId?: number | null;

    @ApiProperty()
    @IsOptional()
    sectorId?: number | null;

    @ApiProperty()
    @IsOptional()
    setsIds?: number[] | null;

    @ApiProperty()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsNumber()
    altitude: number;

    @ApiProperty()
    @IsNumber()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

}