import { StationEntity } from "../station.entity";

export class StationsRO {
    stations: StationEntity[];
    count: number;
}

// ==================================================

export class StationRO {
    station: StationEntity;
}