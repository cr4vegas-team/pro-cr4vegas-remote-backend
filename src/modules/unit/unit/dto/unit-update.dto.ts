
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UnitUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    code: string;

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