import { IsNumber, IsString, IsBoolean } from "class-validator";


export class CreateSensorDto {

    @IsNumber()
    micro_id: number;

    @IsString()
    sensor_type: string;

    @IsString()
    mark: string;

    @IsString()
    model: string;

    @IsBoolean()
    save: boolean;

    @IsNumber()
    min: number;

    @IsNumber()
    max: number;

}