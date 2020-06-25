import { IsBooleanString, IsNumberString, IsString } from "class-validator";
import { UpdateUnitDto } from "../../dto";


export class UpdateUnitHydrantDto extends UpdateUnitDto {

    @IsNumberString()
    diameter: number;

    @IsBooleanString()
    filter: boolean;

}