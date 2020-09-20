import { ControlEntity } from './../../control/control/control.entity';
export declare class UserEntity {
    id: number;
    controls: ControlEntity[];
    username: string;
    email: string;
    password: string;
    active: boolean;
    created: Date;
    updated: Date;
    generatePasswordHash(): void;
}
