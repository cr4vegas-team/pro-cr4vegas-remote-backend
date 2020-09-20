import { ControlService } from './../control/control.service';
import { ManageCreateDto } from './manage-create.dto';
import { ManageEntity } from './manage.entity';
import { Repository } from 'typeorm';
import { ManageRO, ManagesRO } from './manage.interfaces';
export declare class ManageService {
    private readonly _manageRepository;
    private readonly _controlService;
    constructor(_manageRepository: Repository<ManageEntity>, _controlService: ControlService);
    findAll(): Promise<ManagesRO>;
    findAllByControlId(controlId: number): Promise<ManagesRO>;
    insertOne(manageCreateDto: ManageCreateDto): Promise<ManageRO>;
}
