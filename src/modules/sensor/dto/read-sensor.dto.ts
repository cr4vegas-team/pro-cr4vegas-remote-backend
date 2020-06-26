import { Type, Exclude, Expose } from "class-transformer";
import { MicroEntity } from "src/modules/micro/micro.entity";
import { IsNumber, IsString, IsBoolean } from "class-validator";

@Exclude()
export class ReadSensorDto {

    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @Type(type => MicroEntity)
    micro: MicroEntity;

    @Expose()
    @IsString()
    sensor_type: string;

    @Expose()
    @IsString()
    mark: string;

    @Expose()
    @IsString()
    model: string;

    @Expose()
    @IsString()
    code: string;

    @Expose()
    @IsBoolean()
    save: boolean;

    @Expose()
    @IsBoolean()
    limits: boolean;

    @Expose()
    @IsNumber()
    min: number;

    @Expose()
    @IsNumber()
    max: number;

}