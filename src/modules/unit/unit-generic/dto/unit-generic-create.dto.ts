
import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from "class-validator";
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';


export class UnitGenericCreateDto {

    @ApiProperty()
    @ValidateNested()
    unit: UnitCreateDto;

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