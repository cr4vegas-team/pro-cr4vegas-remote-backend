import { Exclude, Expose, Type, Transform, TransformPlainToClass } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';
import { UnitEntity } from '../../unit.entity';


@Exclude()
export class ReadUnitHydrantDto {

    @Expose()
    @IsNumber()
    id: number;

    @Expose()
    @Type(type => UnitEntity)
    unit: UnitEntity;

    @Expose()
    @IsNumber()
    size: number;

    @Expose()
    @IsBoolean()
    valve: boolean;

    @Expose()
    @IsBoolean()
    bouy_alarm: boolean;

    @Expose()
    @IsBoolean()
    bouy_high: boolean;

    @Expose()
    @IsBoolean()
    bouy_medium: boolean;

    @Expose()
    @IsNumber()
    flow: number;

    @Expose()
    @IsNumber()
    counter: number;

}