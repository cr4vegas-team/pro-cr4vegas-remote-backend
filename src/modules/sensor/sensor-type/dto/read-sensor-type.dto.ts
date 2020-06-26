import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class ReadSensorTypeDto {

    @Expose()
    @IsString()
    type: string;

}