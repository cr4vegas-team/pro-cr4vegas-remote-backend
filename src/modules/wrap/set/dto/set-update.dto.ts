import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { UnitEntity } from "src/modules/unit/unit/unit.entity";
import { SetTypeEntity } from "../set-type.entity";


export class SetUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    // =======================================

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(45)
    code: string;

    // =======================================

    @ApiProperty()
    @IsString()
    setType: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    name: string;

    // =======================================

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    // ==========================================================

    @ApiProperty()
    @IsOptional()
    @IsArray()
    units?: number[];
}

export class SetTypeUpdateDto {

    @ApiProperty()
    @IsString()
    oldName: string;

    // =======================================

    @ApiProperty()
    @IsString()
    newName: string;

}