import { SectorEntity } from "../../wrap/sector/sector.entity";
import { SetEntity } from "../../wrap/set/set.entity";
import { StationEntity } from "../../wrap/station/station.entity";
import { ManageEntity } from './../../control/manage/manage.entity';
import { UnitTypeTableEnum } from "./unit-type-table.enum";
export declare class UnitEntity {
    id: number;
    station: StationEntity;
    sector: SectorEntity;
    sets: SetEntity[];
    manages: ManageEntity[];
    typeTable: UnitTypeTableEnum;
    code: string;
    altitude: number;
    latitude: number;
    longitude: number;
    description: string;
    active: number;
    created: Date;
    updated: Date;
}
