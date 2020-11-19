import { Repository } from 'typeorm';
import { UnitService } from '../../unit/unit/unit.service';
import { SetCreateDto } from './dto/set-create.dto';
import { SetRO, SetsRO } from './dto/set-response.dto';
import { SetTypeUpdateDto } from './dto/set-type-update.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetEntity } from './set.entity';
export declare class SetService {
    private readonly _setRepository;
    private readonly _setTypeRepository;
    private readonly _unitService;
    constructor(_setRepository: Repository<SetEntity>, _setTypeRepository: Repository<SetTypeEntity>, _unitService: UnitService);
    findAll(): Promise<SetsRO>;
    findAllByIds(ids: number[]): Promise<SetsRO>;
    findOne(id: number): Promise<SetRO>;
    findOneWithUnits(id: number): Promise<SetRO>;
    createOne(dto: SetCreateDto): Promise<SetRO>;
    updateOne(dto: SetUpdateDto): Promise<SetRO>;
    findAllSetTypes(): Promise<SetTypeEntity[]>;
    insertSetType(setType: SetTypeEntity): Promise<SetTypeEntity>;
    updateSetType(dto: SetTypeUpdateDto): Promise<SetTypeEntity>;
    deleteSetType(name: string): Promise<boolean>;
}
