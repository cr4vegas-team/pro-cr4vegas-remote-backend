import { ControlCreateDto } from './dto/control-create.dto';
import { ControlService } from './control.service';
import { ControlRO, ControlsRO } from './control.interfaces';
export declare class ControlController {
    private readonly _controlService;
    constructor(_controlService: ControlService);
    findAll(): Promise<ControlsRO>;
    findAllByUserId(userId: number): Promise<ControlsRO>;
    insertOne(dto: ControlCreateDto): Promise<ControlRO>;
}
