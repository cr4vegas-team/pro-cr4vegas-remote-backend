import { IsBoolean, IsNumber } from 'class-validator';
import { CreateUnitDto } from "../../dto/create-unit.dto";



export class CreateUnitHydrantDto extends CreateUnitDto {

    @IsNumber()
    diameter: number;

    @IsBoolean()
    filter: boolean;

}