
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';


export class UnitPondUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    // =======================================

    @ApiProperty()
    @ValidateNested()
    unit: UnitUpdateDto;

    // =======================================

    @ApiProperty()
    @IsString()
    code: string;

    // =======================================

    @ApiProperty()
    @IsNumber()
    m3: number;

    // =======================================

    @ApiProperty()
    @IsNumber()
    height: number;

}