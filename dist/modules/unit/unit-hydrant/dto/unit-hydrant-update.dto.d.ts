import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';
export declare class UnitHydrantUpdateDto {
    id: number;
    unit: UnitUpdateDto;
    diameter?: number;
    filter?: number;
}
