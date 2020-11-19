import { ActionCreateDto } from './dto/action-create.dto';
import { ActionService } from './action.service';
import { ActionRO, ActionsRO } from './dto/action-response.dto';
export declare class ActionController {
    private readonly _actionService;
    constructor(_actionService: ActionService);
    findAll(): Promise<ActionsRO>;
    findAllBySessionId(sessionId: number): Promise<ActionsRO>;
    insertOne(manageCreateDto: ActionCreateDto): Promise<ActionRO>;
}
