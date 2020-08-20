import { UnitEntity } from "../../unit/unit/unit.entity";
export declare class SectorEntity {
    id: number;
    units: UnitEntity[];
    code: string;
    name: string;
    description: string;
    updated: Date;
    created: Date;
    active: boolean;
}
