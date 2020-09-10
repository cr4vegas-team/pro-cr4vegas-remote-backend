import { UnitService } from 'src/modules/unit/unit/unit.service';
import { Repository } from 'typeorm';
import { StationCreateDto } from './dto/station-create.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationEntity } from './station.entity';
import { StationRO, StationsRO } from './station.interfaces';
export declare class StationService {
    private readonly _stationRepository;
    private readonly _unitService;
    constructor(_stationRepository: Repository<StationEntity>, _unitService: UnitService);
    findAll(): Promise<StationsRO>;
    findOne(id: number): Promise<StationRO>;
    findOneWithUnits(id: number): Promise<StationRO>;
    createOne(dto: StationCreateDto): Promise<StationRO>;
    updateOne(dto: StationUpdateDto): Promise<StationRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
