import { IsString, IsNumber } from "class-validator";


export class CreateSensorRecordDto {

    @IsNumber()
    sensor_id: number;

    @IsString()
    message: string;

}