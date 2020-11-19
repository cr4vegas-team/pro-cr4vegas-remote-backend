import { SessionEntity } from '../session/session.entity';
export declare class RegistryEntity {
    id: number;
    session: SessionEntity;
    message: string;
    active: number;
    created: Date;
}
