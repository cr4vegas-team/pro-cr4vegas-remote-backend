import { UserRole } from './../user-role.enum';
export class UserLoginDto {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    active: number;
    created: Date;
    updated: Date;
    userAgent: string;
    origin: string;
}