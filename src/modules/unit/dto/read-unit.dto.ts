
import { IsNumber, IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUnitDto {

    @Expose()
    @IsString()
    code: string;

    @Expose()
    @IsNumber()
    altitude: number;

    @Expose()
    @IsNumber()
    latitude: number;

    @Expose()
    @IsNumber()
    longitude: number;

    @Expose()
    @IsString()
    description: string;

}