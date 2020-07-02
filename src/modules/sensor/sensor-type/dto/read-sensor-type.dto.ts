import { Exclude, Expose } from "class-transformer";
import { IsString, IsNumber } from "class-validator";

@Exclude()
export class ReadSensorTypeDto {

    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @IsString()
    name: string;

}