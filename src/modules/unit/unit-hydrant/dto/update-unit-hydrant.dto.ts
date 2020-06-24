import { Type } from "class-transformer";
import { IsBooleanString, IsNumberString } from "class-validator";
import { ReadUnitDto } from "../../dto";


export class UpdateUnitHydrantDto {

    @Type(type => ReadUnitDto)
    unit: ReadUnitDto;

    @IsNumberString()
    diameter: number;

    @IsBooleanString()
    filter: boolean;

}