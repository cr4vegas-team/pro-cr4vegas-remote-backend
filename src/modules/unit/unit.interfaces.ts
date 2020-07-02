import { ReadUnitDto } from "./dto";


export interface UnitRO {
    unit: ReadUnitDto;
}

export interface UnitsRO {
    units: ReadUnitDto[];
    unitsCount: number;
}