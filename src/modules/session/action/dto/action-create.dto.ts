import { IsNumber, IsString } from "class-validator";


export class ActionCreateDto {

    @IsNumber()
    session: number;

    @IsNumber()
    unit: number;

    @IsString()
    action: string;

}