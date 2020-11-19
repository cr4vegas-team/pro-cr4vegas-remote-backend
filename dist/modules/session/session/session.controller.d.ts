import { SessionCreateDto } from './dto/session-create.dto';
import { SessionService } from './session.service';
import { SessionRO, SessionsRO } from './dto/session-response.dto';
export declare class SessionController {
    private readonly _controlService;
    constructor(_controlService: SessionService);
    findAll(): Promise<SessionsRO>;
    findAllByUserId(userId: number): Promise<SessionsRO>;
    insertOne(dto: SessionCreateDto): Promise<SessionRO>;
}
