
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UnitUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
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
    @IsNumber()
    @IsArray()
    sets?: number[];

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
    @IsString()
    @IsOptional()
    description: string;

}