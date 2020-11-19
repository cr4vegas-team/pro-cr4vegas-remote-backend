import { UnitEntity } from '../../unit/unit/unit.entity';
import { SessionEntity } from '../session/session.entity';
export declare class ActionEntity {
    id: number;
    session: SessionEntity;
    unit: UnitEntity;
    created: Date;
}
