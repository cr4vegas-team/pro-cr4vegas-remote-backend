import { SessionService } from '../session/session.service';
import { ActionCreateDto } from './dto/action-create.dto';
import { ActionEntity } from './action.entity';
import { Repository } from 'typeorm';
import { ActionRO, ActionsRO } from './dto/action-response.dto';
export declare class ActionService {
    private readonly _manageRepository;
    private readonly _sessionService;
    constructor(_manageRepository: Repository<ActionEntity>, _sessionService: SessionService);
    findAll(): Promise<ActionsRO>;
    findAllBySessionId(sessionId: number): Promise<ActionsRO>;
    insertOne(manageCreateDto: ActionCreateDto): Promise<ActionRO>;
}
