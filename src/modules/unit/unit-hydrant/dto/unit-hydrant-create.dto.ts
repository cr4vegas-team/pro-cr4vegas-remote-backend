
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, ValidateNested } from "class-validator";
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';


export class UnitHydrantCreateDto {

    @ApiProperty()
    @ValidateNested()
    unit: UnitCreateDto;

    // =======================================

    @ApiProperty()
    @IsNumber()
    diameter: number;

    // =======================================

    @ApiProperty()
    @IsIn([0, 1])
    filter: number;

}