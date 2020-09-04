import { Repository } from 'typeorm';
import { UnitEntity } from './unit.entity';
export declare class UnitService {
    private readonly _unitRepository;
    constructor(_unitRepository: Repository<UnitEntity>);
    delete(id: number): Promise<boolean>;
    activate(id: number): Promise<boolean>;
}
