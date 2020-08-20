import { UnitEntity } from "../../unit/unit/unit.entity";
export declare class StationEntity {
    id: number;
    units: UnitEntity[];
    code: string;
    name: string;
    altitude: number;
    latitude: number;
    longitude: number;
    description: string;
    updated: Date;
    created: Date;
    active: boolean;
}
