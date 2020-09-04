
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from "class-validator";
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';


export class UnitPondCreateDto {

    @ApiProperty()
    @ValidateNested()
    unit: UnitCreateDto;

    // =======================================

    @ApiProperty()
    @IsNumber()
    m3: number;

    // =======================================

    @ApiProperty()
    @IsNumber()
    height: number;

}