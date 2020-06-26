import { IsString } from "class-validator";


export class UpdateSensorRecordDto {

    @IsString()
    type: string;

}