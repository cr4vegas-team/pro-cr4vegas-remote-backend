import { UnitUpdateDto } from '../../unit/dto/unit-update.dto';
export declare class UnitHydrantUpdateDto {
    id: number;
    unit: UnitUpdateDto;
    initBatch?: number;
    diameter?: number;
    filter?: number;
}
