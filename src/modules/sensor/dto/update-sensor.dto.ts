import { IsBoolean, IsNumber, IsString } from "class-validator";


export class UpdateSensorDto {

    @IsNumber()
    micro_id: number;

    @IsNumber()
    sensor_id: number;

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