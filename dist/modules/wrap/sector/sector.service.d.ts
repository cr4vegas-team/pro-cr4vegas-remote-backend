import { UnitService } from 'src/modules/unit/unit/unit.service';
import { Repository } from 'typeorm';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorEntity } from './sector.entity';
import { SectorRO, SectorsRO } from './sector.interfaces';
export declare class SectorService {
    private readonly _sectorRepository;
    private readonly _unitService;
    constructor(_sectorRepository: Repository<SectorEntity>, _unitService: UnitService);
    findAll(): Promise<SectorsRO>;
    findOne(id: number): Promise<SectorRO>;
    findOneWithUnits(id: number): Promise<SectorRO>;
    createOne(dto: SectorCreateDto): Promise<SectorRO>;
    updateOne(dto: SectorUpdateDto): Promise<SectorRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
