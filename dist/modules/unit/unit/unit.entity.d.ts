import { ActionEntity } from '../../session/action/action.entity';
import { SectorEntity } from '../../wrap/sector/sector.entity';
import { SetEntity } from '../../wrap/set/set.entity';
import { StationEntity } from '../../wrap/station/station.entity';
import { UnitTypeTableEnum } from './unit-type.enum';
export declare class UnitEntity {
    id: number;
    station: StationEntity;
    sector: SectorEntity;
    sets: SetEntity[];
    actions: ActionEntity[];
    unitTypeTable: UnitTypeTableEnum;
    code: number;
    altitude: number;
    latitude: number;
    longitude: number;
    description: string;
    active: number;
    image: string;
    created: Date;
    updated: Date;
}
