import { IsString } from "class-validator";


export class UpdateSensorTypeDto {

    @IsString()
    name: string;

}