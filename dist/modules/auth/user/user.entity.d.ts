import { SessionEntity } from '../../session/session/session.entity';
import { UserRole } from './user-role.enum';
export declare class UserEntity {
    id: number;
    sessions: SessionEntity[];
    username: string;
    email: string;
    password: string;
    role: UserRole;
    active: number;
    created: Date;
    updated: Date;
    generatePasswordHash(): void;
}
