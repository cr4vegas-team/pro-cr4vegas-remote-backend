import { UnitsRO } from './dto/unit-response.dto';
import { UnitService } from './unit.service';
export declare class UnitController {
    private readonly _unitService;
    constructor(_unitService: UnitService);
    findAll(): Promise<UnitsRO>;
}
