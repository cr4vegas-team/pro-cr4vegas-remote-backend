import { UnitHydrantEntity } from "src/modules/unit/unit-hydrant/unit-hydrant.entity";
import { StationEntity } from "./station.entity";
export interface StationsRO {
    stations: StationEntity[];
    count: number;
}

export interface StationRO {
    station: StationEntity;
}