
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { UnitCreateDto } from '../../unit/dto/unit-create.dto';


export class UnitGenericCreateDto {

    @ApiProperty()
    @ValidateNested()
    unit: UnitCreateDto;

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