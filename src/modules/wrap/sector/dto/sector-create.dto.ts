import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsOptional, IsNumber, IsArray } from "class-validator";


export class SectorCreateDto {

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

    // ==========================================================
    
    @ApiProperty()
    @IsOptional()
    @IsArray()
    units: number[];

    // ==========================================================
    
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    name: string;

    // ==========================================================
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

}