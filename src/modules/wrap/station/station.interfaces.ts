import { StationEntity } from "./station.entity";


export interface StationsRO {
    stations: StationEntity[];
    count: number;
}

export interface StationRO {
    station: StationEntity;
}