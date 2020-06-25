import { IsBoolean, IsNumber } from "class-validator";
import { UpdateUnitDto } from "../../dto";


export class UpdateUnitHydrantDto extends UpdateUnitDto {

    @IsNumber()
    diameter: number;

    @IsBoolean()
    filter: boolean;

}