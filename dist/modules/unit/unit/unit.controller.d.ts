import { UnitsRO } from './unit.interfaces';
import { UnitService } from './unit.service';
export declare class UnitController {
    private readonly _unitService;
    constructor(_unitService: UnitService);
    findAll(): Promise<UnitsRO>;
    delete(id: number): Promise<boolean>;
    activate(id: number): Promise<boolean>;
}
