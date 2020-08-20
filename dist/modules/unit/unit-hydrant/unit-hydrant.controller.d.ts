import { UnitHydrantDto } from './unit-hydrant.dto';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitHydrantService } from './unit-hydrant.service';
export declare class UnitHydrantController {
    private readonly _unitHydrantService;
    constructor(_unitHydrantService: UnitHydrantService);
    findAll(active: number): Promise<UnitsHydrantsRO>;
    findOne(code: string, active: number): Promise<UnitHydrantRO>;
    createOne(dto: UnitHydrantDto): Promise<UnitHydrantRO>;
    updateOne(code: string, dto: UnitHydrantDto): Promise<boolean>;
    deleteOne(code: string): Promise<boolean>;
    activateOne(code: string): Promise<boolean>;
}
