import { UnitService } from 'src/modules/unit/unit/unit.service';
import { Repository } from 'typeorm';
import { SetCreateDto } from './dto/set-create.dto';
import { SetTypeUpdateDto, SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetEntity } from './set.entity';
import { SetRO, SetsRO } from './set.interfaces';
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
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
    findAllSetTypes(): Promise<SetTypeEntity[]>;
    insertSetType(setType: SetTypeEntity): Promise<SetTypeEntity>;
    updateSetType(dto: SetTypeUpdateDto): Promise<SetTypeEntity>;
    deleteSetType(name: string): Promise<boolean>;
}
