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

    @IsString()
    code: string;

    @IsBoolean()
    save: boolean;

    @IsBoolean()
    limits: boolean;

    @IsNumber()
    min: number;

    @IsNumber()
    max: number;

}