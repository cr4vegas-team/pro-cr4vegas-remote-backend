
import { IsNumber, IsString } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { MicroEntity } from "src/modules/micro/micro.entity";

@Exclude()
export class ReadUnitDto {

    @Expose()
    @IsString()
    code: string;

    @Expose()
    @Type(type => MicroEntity)
    micros: MicroEntity[];

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