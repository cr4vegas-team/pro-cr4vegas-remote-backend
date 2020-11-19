
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
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
    @IsOptional()
    data1?: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    data2?: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    data3?: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    data4?: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    data5?: string;

}