import { UnitEntity } from "../../unit/unit/unit.entity";
import { SetTypeEntity } from './set-type.entity';
export declare class SetEntity {
    id: number;
    setType: SetTypeEntity;
    units: UnitEntity[];
    code: string;
    name: string;
    description: string;
    updated: Date;
    created: Date;
    active: boolean;
}
