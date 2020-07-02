import { IsNumber, IsString, Matches } from "class-validator";


export class UpdateUnitDto {

    @IsNumber()
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