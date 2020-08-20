import { Repository } from 'typeorm';
import { SetDto } from '../set/set.dto';
import { SetEntity } from './set.entity';
import { SetRO, SetsRO } from './set.interfaces';
export declare class SetService {
    private readonly _setRepository;
    constructor(_setRepository: Repository<SetEntity>);
    findAll(active?: number): Promise<SetsRO>;
    findOne(id: number, active?: number): Promise<SetRO>;
    createOne(dto: SetDto): Promise<SetRO>;
    updateOne(id: number, dto: SetDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
