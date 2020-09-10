import { Repository } from 'typeorm';
import { UnitService } from '../unit/unit.service';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
export declare class UnitHydrantService {
    private readonly _unitHydrantRepository;
    private readonly _unitService;
    constructor(_unitHydrantRepository: Repository<UnitHydrantEntity>, _unitService: UnitService);
    findAll(): Promise<UnitsHydrantsRO>;
    findOneById(id: number): Promise<UnitHydrantRO>;
    createOne(dto: UnitHydrantCreateDto): Promise<UnitHydrantRO>;
    updateOne(dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO>;
}
