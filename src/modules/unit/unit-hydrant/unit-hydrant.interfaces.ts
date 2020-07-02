import { ReadUnitHydrantDto } from "./dto";


export interface UnitHydrantRO {
    unitHydrant: ReadUnitHydrantDto;
}

export interface UnitsHydrantsRO {
    unitsHydrants: ReadUnitHydrantDto[];
    unitsHydrantsCount: number;
}