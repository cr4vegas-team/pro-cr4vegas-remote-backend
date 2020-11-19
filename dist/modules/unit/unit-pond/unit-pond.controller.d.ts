import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondRO, UnitsPondsRO } from './dto/unit-pond-response.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondService } from './unit-pond.service';
export declare class UnitPondController {
    private readonly _unitPondService;
    constructor(_unitPondService: UnitPondService);
    findAll(): Promise<UnitsPondsRO>;
    findOne(id: number): Promise<UnitPondRO>;
    createOne(dto: UnitPondCreateDto): Promise<UnitPondRO>;
    updateOne(dto: UnitPondUpdateDto): Promise<UnitPondRO>;
}
