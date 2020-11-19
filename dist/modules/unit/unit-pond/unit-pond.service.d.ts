import { Repository } from 'typeorm';
import { UnitService } from '../unit/unit.service';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondEntity } from './unit-pond.entity';
import { UnitPondRO, UnitsPondsRO } from './dto/unit-pond-response.dto';
export declare class UnitPondService {
    private readonly _unitPondRepository;
    private readonly _unitService;
    constructor(_unitPondRepository: Repository<UnitPondEntity>, _unitService: UnitService);
    findAll(): Promise<UnitsPondsRO>;
    findOneById(id: number): Promise<UnitPondRO>;
    createOne(dto: UnitPondCreateDto): Promise<UnitPondRO>;
    updateOne(dto: UnitPondUpdateDto): Promise<UnitPondRO>;
}
