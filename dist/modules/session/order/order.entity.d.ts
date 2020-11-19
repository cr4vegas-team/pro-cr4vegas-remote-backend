import { SessionEntity } from '../session/session.entity';
export declare class OrderEntity {
    id: number;
    session: SessionEntity;
    message: string;
    active: number;
    created: Date;
    updated: Date;
}
