
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class UnitDto {

    /* @ApiProperty({ enum: UnitType })
    @IsIn(Object.values(UnitType).filter(value => typeof value === 'string'))
    unitType: UnitType; */

    @ApiProperty()
    @IsNumber()
    stationId: number;

    @ApiProperty()
    @IsNumber()
    sectorId: number;

    @ApiProperty()
    @IsArray()
    setsIds: number[];

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