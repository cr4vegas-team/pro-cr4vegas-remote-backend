import { Repository } from 'typeorm';
import { UnitService } from '../unit/unit.service';
import { UnitHydrantDto } from './unit-hydrant.dto';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
export declare class UnitHydrantService {
    private readonly _unitHydrantRepository;
    private readonly _unitService;
    constructor(_unitHydrantRepository: Repository<UnitHydrantEntity>, _unitService: UnitService);
    findAll(active?: number): Promise<UnitsHydrantsRO>;
    findOneByCode(code: string, active?: number): Promise<UnitHydrantRO>;
    createOne(dto: UnitHydrantDto): Promise<UnitHydrantRO>;
    updateOne(code: string, dto: UnitHydrantDto): Promise<boolean>;
    deleteOne(code: string): Promise<boolean>;
    activateOne(code: string): Promise<boolean>;
}
