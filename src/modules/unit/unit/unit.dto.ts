
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UnitType } from "./unit-types.constant";
import { ApiProperty } from '@nestjs/swagger';

export class UnitDto {

    @ApiProperty({ enum: UnitType })
    @IsIn(Object.values(UnitType).filter(value => typeof value === 'string'))
    unitType: UnitType;

    @ApiProperty()
    @IsInt()
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