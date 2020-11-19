import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericRO, UnitsGenericsRO } from './dto/unit-generic-response.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericService } from './unit-generic.service';
export declare class UnitGenericController {
    private readonly _unitGenericService;
    constructor(_unitGenericService: UnitGenericService);
    findAll(): Promise<UnitsGenericsRO>;
    findOne(id: number): Promise<UnitGenericRO>;
    createOne(dto: UnitGenericCreateDto): Promise<UnitGenericRO>;
    updateOne(dto: UnitGenericUpdateDto): Promise<UnitGenericRO>;
}
