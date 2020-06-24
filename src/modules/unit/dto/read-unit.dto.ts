
import { IsNumber, IsString } from "class-validator";


export class ReadUnitDto {

    @IsString()
    code: string;

    @IsNumber()
    altitude: number;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    description: string;

}