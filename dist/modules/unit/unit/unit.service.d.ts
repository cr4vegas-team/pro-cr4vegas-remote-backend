import { Repository } from 'typeorm';
import { SectorService } from '../../wrap/sector/sector.service';
import { SetService } from '../../wrap/set/set.service';
import { StationService } from '../../wrap/station/station.service';
import { UnitCreateDto } from './dto/unit-create.dto';
import { UnitRO, UnitsRO } from './dto/unit-response.dto';
import { UnitUpdateDto } from './dto/unit-update.dto';
import { UnitTypeTableEnum } from './unit-type.enum';
import { UnitEntity } from './unit.entity';
export declare class UnitService {
    private readonly _unitRepository;
    private readonly _setService;
    private readonly _sectorService;
    private readonly _stationService;
    constructor(_unitRepository: Repository<UnitEntity>, _setService: SetService, _sectorService: SectorService, _stationService: StationService);
    findAll(): Promise<UnitsRO>;
    findAllByIds(ids: number[]): Promise<UnitsRO>;
    create(unitCreateDto: UnitCreateDto, unitTypeTable: UnitTypeTableEnum): Promise<UnitRO>;
    update(unitUpdateDto: UnitUpdateDto): Promise<UnitRO>;
}
