import { UnitService } from './unit.service';
export declare class UnitController {
    private readonly _unitService;
    constructor(_unitService: UnitService);
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
