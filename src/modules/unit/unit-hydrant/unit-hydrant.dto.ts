
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, ValidateNested } from "class-validator";
import { UnitDto } from '../unit/unit.dto';


export class UnitHydrantDto {

    @ApiProperty()
    @ValidateNested()
    unit: UnitDto;

    @ApiProperty()
    @IsNumber()
    diameter: number;

    @ApiProperty()
    @IsIn([0, 1])
    filter: number;

}