import { Repository } from 'typeorm';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericEntity } from './unit-generic.entity';
import { UnitGenericRO, UnitsGenericsRO } from './unit-generic.interfaces';
export declare class UnitGenericService {
    private readonly _unitGenericRepository;
    constructor(_unitGenericRepository: Repository<UnitGenericEntity>);
    findAll(): Promise<UnitsGenericsRO>;
    findOneById(id: number): Promise<UnitGenericRO>;
    createOne(dto: UnitGenericCreateDto): Promise<UnitGenericRO>;
    updateOne(dto: UnitGenericUpdateDto): Promise<UnitGenericRO>;
}
