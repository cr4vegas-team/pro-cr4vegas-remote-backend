import { SetCreateDto } from './dto/set-create.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetRO, SetsRO } from './set.interfaces';
import { SetService } from './set.service';
export declare class SetController {
    private readonly _setService;
    constructor(_setService: SetService);
    findAll(): Promise<SetsRO>;
    findOne(id: number): Promise<SetRO>;
    createOne(dto: SetCreateDto): Promise<SetRO>;
    updateOne(dto: SetUpdateDto): Promise<SetRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
    insertSetType(dto: SetTypeEntity): Promise<SetTypeEntity>;
    deleteSetType(name: string): Promise<boolean>;
    updateSetType(oldName: string, newName: string): Promise<SetTypeEntity>;
}
