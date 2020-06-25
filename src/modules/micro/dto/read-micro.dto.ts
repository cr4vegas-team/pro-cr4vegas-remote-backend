import { Exclude, Expose, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { UnitEntity } from "src/modules/unit/entity/unit.entity";

@Exclude()
export class ReadMicroDto {

    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @Type(type => UnitEntity)
    unit: UnitEntity;

    @Expose()
    @IsBoolean()
    communication: boolean;

    @Expose()
    @IsNumber()
    priority: number;

    @Expose()
    @IsString()
    mark: string;

    @Expose()
    @IsString()
    model: string;

    @Expose()
    @IsString()
    code: string;

}