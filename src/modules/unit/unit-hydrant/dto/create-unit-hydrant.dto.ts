import { Type } from 'class-transformer';
import { IsBooleanString, IsNumberString } from 'class-validator';
import { ReadUnitDto } from '../../dto';
import { CreateUnitDto } from "../../dto/create-unit.dto";



export class CreateUnitHydrantDto extends CreateUnitDto {

    @Type(type => ReadUnitDto)
    unit: ReadUnitDto;

    @IsNumberString()
    diameter: number;

    @IsBooleanString()
    filter: boolean;

}