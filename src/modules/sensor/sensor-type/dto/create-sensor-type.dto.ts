import { IsString } from "class-validator";


export class CreateSensorTypeDto {

    @IsString()
    name: string;

}