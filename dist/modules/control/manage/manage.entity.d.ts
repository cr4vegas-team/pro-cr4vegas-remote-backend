import { UnitEntity } from '../../unit/unit/unit.entity';
import { ControlEntity } from './../control/control.entity';
export declare class ManageEntity {
    id: number;
    control: ControlEntity;
    unit: UnitEntity;
    created: Date;
}
