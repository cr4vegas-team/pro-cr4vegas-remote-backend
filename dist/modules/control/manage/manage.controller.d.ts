import { ManageCreateDto } from './manage-create.dto';
import { ManageService } from './manage.service';
import { ManageRO, ManagesRO } from './manage.interfaces';
export declare class ManageController {
    private readonly _manageService;
    constructor(_manageService: ManageService);
    findAll(): Promise<ManagesRO>;
    findAllByControlId(controlId: number): Promise<ManagesRO>;
    insertOne(manageCreateDto: ManageCreateDto): Promise<ManageRO>;
}
