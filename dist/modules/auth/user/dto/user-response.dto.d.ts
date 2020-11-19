import { UserRole } from './../user-role.enum';
export declare class UserDto {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    active: number;
}
export declare class UserRO {
    user: UserDto;
}
export declare class UsersRO {
    users: UserDto[];
    count: number;
}
