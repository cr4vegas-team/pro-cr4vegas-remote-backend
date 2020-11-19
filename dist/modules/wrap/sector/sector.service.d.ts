import { Repository } from 'typeorm';
import { UnitService } from '../../unit/unit/unit.service';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorRO, SectorsRO } from './dto/sector-response.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorEntity } from './sector.entity';
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
