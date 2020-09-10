import { Repository } from 'typeorm';
import { UnitService } from '../unit/unit.service';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericEntity } from './unit-generic.entity';
import { UnitGenericRO, UnitsGenericsRO } from './unit-generic.interfaces';
export declare class UnitGenericService {
    private readonly _unitGenericRepository;
    private readonly _unitService;
    constructor(_unitGenericRepository: Repository<UnitGenericEntity>, _unitService: UnitService);
    findAll(): Promise<UnitsGenericsRO>;
    findOneById(id: number): Promise<UnitGenericRO>;
    create(dto: UnitGenericCreateDto): Promise<UnitGenericRO>;
    update(dto: UnitGenericUpdateDto): Promise<UnitGenericRO>;
}
