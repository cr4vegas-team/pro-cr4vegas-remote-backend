import { UnitTypeTableEnum } from '../unit-type-table.enum';
import { UnitTypeEnum } from '../unit-type.enum';
export declare class UnitBindDto {
    id: number;
    code: string;
    unitType: UnitTypeEnum;
    table: UnitTypeTableEnum;
}
