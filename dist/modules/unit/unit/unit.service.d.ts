import { Repository } from 'typeorm';
import { UnitType } from './unit-types.constant';
import { UnitEntity } from './unit.entity';
import { UnitRO, UnitsRO } from './unit.interfaces';
import { UnitDto } from './unit.dto';
import { SectorService } from 'src/modules/wrap/sector/sector.service';
import { StationService } from 'src/modules/wrap/station/station.service';
import { SetService } from 'src/modules/wrap/set/set.service';
export declare class UnitService {
    private readonly _unitRepository;
    private readonly _sectorService;
    private readonly _stationService;
    private readonly _setService;
    constructor(_unitRepository: Repository<UnitEntity>, _sectorService: SectorService, _stationService: StationService, _setService: SetService);
    findAll(query: any): Promise<UnitsRO>;
    findOne(query: any): Promise<UnitRO>;
    createOne(dto: UnitDto, unitType: UnitType): Promise<UnitRO>;
    updateOne(id: number, dto: UnitDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
