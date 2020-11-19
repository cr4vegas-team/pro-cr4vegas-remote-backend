import { SessionEntity } from "../session.entity";


export interface SessionRO {
    session: SessionEntity;
}

export interface SessionsRO {
    sessions: SessionEntity[];
    count: number;
}