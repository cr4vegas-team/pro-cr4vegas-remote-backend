import { IsString } from "class-validator";


export class CreateSensorRecordDto {

    @IsString()
    type: string;

}