import { UserRole } from '../user-role.enum';
export declare class UpdateUserDto {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    active: number;
    role: UserRole;
}
