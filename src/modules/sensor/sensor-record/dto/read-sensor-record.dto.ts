import { Exclude, Expose, Type } from "class-transformer";
import { IsString, IsDate } from "class-validator";
import { SensorEntity } from "../../sensor.entity";

@Exclude()
export class ReadSensorRecordDto {

    @Expose()
    @Type(() => SensorEntity)
    sensor: SensorEntity;

    @Expose()
    @IsString()
    message: string;

    @Expose()
    @IsDate()
    created: Date;

}