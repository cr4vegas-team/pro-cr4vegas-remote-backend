
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString, IsBoolean, IsDate } from "class-validator";
import { MicroEntity } from "src/modules/micro/micro.entity";

@Exclude()
export class ReadUnitDto {

    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @IsNumber()
    code: number;

    @Expose()
    @Type(() => MicroEntity)
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

    @Expose()
    @IsBoolean()
    active: boolean;

    @Expose()
    @IsDate()
    created: Date;

    @Expose()
    @IsDate()
    updated: Date;

}