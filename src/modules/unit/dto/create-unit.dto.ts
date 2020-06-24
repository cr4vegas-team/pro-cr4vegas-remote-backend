
import { IsNumberString, IsString, Matches } from "class-validator";


export class CreateUnitDto {

    @Matches(/^(ST||SC||CJ|HD|VT|BB|BS|HB|CM|MC|UD)([0IVXAB]{2})([0-9]{5})$/) // ST0000001 - HDVA00104
    code: string;

    @IsNumberString()
    altitude: number;

    @IsNumberString()
    latitude: number;

    @IsNumberString()
    longitude: number;

    @IsString()
    description: string;

}