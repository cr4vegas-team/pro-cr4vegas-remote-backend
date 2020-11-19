import { UserRole } from './../user-role.enum';
export declare class UserCreateDto {
    username: string;
    email: string;
    password: string;
    active: number;
    role: UserRole;
}
