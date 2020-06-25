import { IsString, IsBooleanString, IsNumberString } from "class-validator";
import { UnitEntity } from "src/modules/unit/entity/unit.entity";
import { Type, Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadMicroDto {

    @Expose()
    @Type(type => UnitEntity)
    unit: UnitEntity;

    @Expose()
    @IsBooleanString()
    communication: boolean;

    @Expose()
    @IsNumberString()
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