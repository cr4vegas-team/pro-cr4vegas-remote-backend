import { SectorEntity } from "../../wrap/sector/sector.entity";
import { SetEntity } from "../../wrap/set/set.entity";
import { StationEntity } from "../../wrap/station/station.entity";
import { UnitType } from "./unit-types.constant";
export declare class UnitEntity {
    id: number;
    station: StationEntity;
    sector: SectorEntity;
    sets: SetEntity[];
    unitType: UnitType;
    code: string;
    altitude: number;
    latitude: number;
    longitude: number;
    description: string;
    active: number;
    created: Date;
    updated: Date;
}
