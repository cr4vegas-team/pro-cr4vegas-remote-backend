import { Repository } from 'typeorm';
import { SetCreateDto } from './dto/set-create.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetEntity } from './set.entity';
import { SetRO, SetsRO } from './set.interfaces';
export declare class SetService {
    private readonly _setRepository;
    private readonly _setTypeRepository;
    constructor(_setRepository: Repository<SetEntity>, _setTypeRepository: Repository<SetTypeEntity>);
    findAll(): Promise<SetsRO>;
    findOneById(id: number): Promise<SetRO>;
    createOne(dto: SetCreateDto): Promise<SetRO>;
    updateOne(dto: SetUpdateDto): Promise<SetRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
    insertSetType(setType: SetTypeEntity): Promise<SetTypeEntity>;
    updateSetType(oldName: string, newName: string): Promise<SetTypeEntity>;
    deleteSetType(name: string): Promise<boolean>;
}
