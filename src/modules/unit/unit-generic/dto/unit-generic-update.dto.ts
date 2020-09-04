
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';


export class UnitGenericUpdateDto {

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
    data1: string;

    // =======================================

    @ApiProperty()
    @IsString()
    data2: string;

    // =======================================

    @ApiProperty()
    @IsString()
    data3: string;

    // =======================================

    @ApiProperty()
    @IsString()
    data4: string;

    // =======================================

    @ApiProperty()
    @IsString()
    data5: string;

}