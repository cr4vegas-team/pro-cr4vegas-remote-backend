export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    active: boolean;
    created: Date;
    updated: Date;
    generatePasswordHash(): void;
}
