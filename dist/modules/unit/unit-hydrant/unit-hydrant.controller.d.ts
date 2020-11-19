import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantRO, UnitsHydrantsRO } from './dto/unit-hydrant-response.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantService } from './unit-hydrant.service';
export declare class UnitHydrantController {
    private readonly _unitHydrantService;
    constructor(_unitHydrantService: UnitHydrantService);
    findAll(): Promise<UnitsHydrantsRO>;
    findOne(id: number): Promise<UnitHydrantRO>;
    createOne(dto: UnitHydrantCreateDto): Promise<UnitHydrantRO>;
    updateOne(dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO>;
}
