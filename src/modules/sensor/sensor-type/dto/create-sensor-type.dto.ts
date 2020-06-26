import { IsString } from "class-validator";


export class CreateSensorTypeDto {

    @IsString()
    type: string;

}