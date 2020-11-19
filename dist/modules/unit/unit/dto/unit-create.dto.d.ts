import { UnitTypeTableEnum } from '../unit-type.enum';
export declare class UnitCreateDto {
    code: number;
    unitTypeTable: UnitTypeTableEnum;
    station?: number;
    sector: number;
    sets?: number[];
    altitude: number;
    latitude: number;
    longitude: number;
    description?: string;
    active: number;
    image: string;
}
