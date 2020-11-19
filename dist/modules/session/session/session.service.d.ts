import { SessionCreateDto } from './dto/session-create.dto';
import { SessionEntity } from './session.entity';
import { Repository } from 'typeorm';
import { SessionRO, SessionsRO } from './dto/session-response.dto';
export declare class SessionService {
    private readonly _sessionRepository;
    constructor(_sessionRepository: Repository<SessionEntity>);
    findAll(): Promise<SessionsRO>;
    findAllByUserId(userId: number): Promise<SessionsRO>;
    findOneById(id: number): Promise<SessionRO>;
    startSession(sessionCreateDto: SessionCreateDto): Promise<SessionRO>;
    finalizeSession(id: number): Promise<boolean>;
}
