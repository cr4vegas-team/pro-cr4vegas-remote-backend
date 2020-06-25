import { Type, Exclude, Expose } from 'class-transformer';
import { IsBooleanString, IsNumberString, IsNotEmpty, IsDefined } from 'class-validator';
import { ReadUnitDto } from '../../dto';
import { CreateUnitDto } from "../../dto/create-unit.dto";


@Exclude()
export class ReadUnitHydrantDto {

    @Expose()
    @Type(type => ReadUnitDto)
    unit: ReadUnitDto;

    @Expose()
    @IsNumberString()
    diameter: number;

    @Expose()
    @IsBooleanString()
    filter: boolean;

}