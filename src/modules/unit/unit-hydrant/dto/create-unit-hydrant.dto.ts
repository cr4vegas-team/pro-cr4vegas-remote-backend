import { IsBoolean, IsNumber, Matches } from 'class-validator';
import { CreateUnitDto } from "../../dto/create-unit.dto";



export class CreateUnitHydrantDto extends CreateUnitDto {

    size: number;

    valve: boolean;

    bouy_alarm: boolean;

    bouy_high: boolean;

    bouy_medium: boolean;

    flow: number;

    counter: number;

}