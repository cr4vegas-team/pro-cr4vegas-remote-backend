
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsBooleanString, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, Max, MaxLength, Min } from "class-validator";
import { UnitDto } from "../unit/unit.dto";


export class UnitHydrantDto extends UnitDto {

    @ApiProperty()
    @MaxLength(45)
    code: string;

    @ApiProperty()
    @IsInt()
    diameter: number;

    @ApiProperty()
    @IsInt()
    @IsIn([0,1])
    @IsOptional()
    filter: number;

}