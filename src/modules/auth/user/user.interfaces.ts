

export interface UserData {
    id: number;
    username: string;
    email: string;
}

export interface UserRO {
    user: UserData;
}

export interface UsersRO {
    users: UserData[];
    count: number;
}