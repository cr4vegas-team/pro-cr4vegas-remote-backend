
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';


export class UnitHydrantUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    // =======================================

    @ApiProperty()
    @ValidateNested()
    unit: UnitUpdateDto;

    // =======================================

    @ApiProperty()
    @IsNumber()
    diameter: number;

    // =======================================

    @ApiProperty()
    @IsIn([0, 1])
    filter: number;

}