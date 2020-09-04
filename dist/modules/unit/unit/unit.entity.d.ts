import { SectorEntity } from "../../wrap/sector/sector.entity";
import { SetEntity } from "../../wrap/set/set.entity";
import { StationEntity } from "../../wrap/station/station.entity";
import { UnitTypeEnum } from "./unit-type.enum";
export declare class UnitEntity {
    id: number;
    station: StationEntity;
    sector: SectorEntity;
    sets: SetEntity[];
    unitType: UnitTypeEnum;
    code: string;
    table: string;
    altitude: number;
    latitude: number;
    longitude: number;
    description: string;
    active: number;
    created: Date;
    updated: Date;
}
