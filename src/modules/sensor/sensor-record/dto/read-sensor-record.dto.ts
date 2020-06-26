import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class ReadSensorRecordDto {

    @Expose()
    @IsString()
    type: string;

}