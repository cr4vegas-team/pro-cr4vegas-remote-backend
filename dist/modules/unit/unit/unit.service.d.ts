import { SectorService } from '../../wrap/sector/sector.service';
import { SetService } from '../../wrap/set/set.service';
import { StationService } from '../../wrap/station/station.service';
import { Repository } from 'typeorm';
import { UnitCreateDto } from './dto/unit-create.dto';
import { UnitUpdateDto } from './dto/unit-update.dto';
import { UnitTypeTableEnum } from './unit-type-table.enum';
import { UnitTypeEnum } from './unit-type.enum';
import { UnitEntity } from './unit.entity';
import { UnitRO, UnitsRO } from './unit.interfaces';
export declare class UnitService {
    private readonly _unitRepository;
    private readonly _setService;
    private readonly _sectorService;
    private readonly _stationService;
    constructor(_unitRepository: Repository<UnitEntity>, _setService: SetService, _sectorService: SectorService, _stationService: StationService);
    findAll(): Promise<UnitsRO>;
    findAllByIds(ids: number[]): Promise<UnitsRO>;
    delete(id: number): Promise<boolean>;
    activate(id: number): Promise<boolean>;
    create(unitCreateDto: UnitCreateDto, unitType: UnitTypeEnum, unitTypeTable: UnitTypeTableEnum): Promise<UnitRO>;
    update(unitUpdateDto: UnitUpdateDto): Promise<UnitRO>;
}
