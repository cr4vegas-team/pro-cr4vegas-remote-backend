import { IsBoolean, IsNumber, IsString, Matches } from "class-validator";


export class UpdateUnitDto {

    @Matches(/^(ST||SC||CJ|HD|VT|BB|BS|HB|CM|MC|UD)([0IVXAB]{2})([0-9]{5})$/) // ST0000001 - HDVA00104
    code: string;

    @IsNumber()
    altitude: number;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    description: string;

    @IsBoolean()
    active: boolean;

}