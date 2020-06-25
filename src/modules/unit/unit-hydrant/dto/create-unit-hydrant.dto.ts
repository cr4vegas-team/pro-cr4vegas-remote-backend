import { IsBooleanString, IsNumberString, IsString } from 'class-validator';
import { CreateUnitDto } from "../../dto/create-unit.dto";



export class CreateUnitHydrantDto extends CreateUnitDto {

    @IsNumberString()
    diameter: number;

    @IsBooleanString()
    filter: boolean;

}