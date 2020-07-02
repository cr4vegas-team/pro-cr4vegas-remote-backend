import { IsBoolean, IsNumber, Matches } from "class-validator";
import { UpdateUnitDto } from "../../dto";


export class UpdateUnitHydrantDto extends UpdateUnitDto {

    size: number;

    valve: boolean;

    bouy_alarm: boolean;

    bouy_high: boolean;

    bouy_medium: boolean;

    flow: number;

    counter: number;

}