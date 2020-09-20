import { ControlCreateDto } from './dto/control-create.dto';
import { ControlEntity } from './control.entity';
import { Repository } from 'typeorm';
import { ControlRO, ControlsRO } from './control.interfaces';
export declare class ControlService {
    private readonly _controlRepository;
    constructor(_controlRepository: Repository<ControlEntity>);
    findAll(): Promise<ControlsRO>;
    findAllByUserId(userId: number): Promise<ControlsRO>;
    findOneById(id: number): Promise<ControlRO>;
    insertOne(controlCreateDto: ControlCreateDto): Promise<ControlRO>;
    finalizeControl(id: number): Promise<boolean>;
}
