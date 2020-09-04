import { Repository } from 'typeorm';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorEntity } from './sector.entity';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorUpdateDto } from './dto/sector-update.dto';
export declare class SectorService {
    private readonly _sectorRepository;
    constructor(_sectorRepository: Repository<SectorEntity>);
    findAll(): Promise<SectorsRO>;
    findOne(id: number): Promise<SectorRO>;
    createOne(dto: SectorCreateDto): Promise<SectorRO>;
    updateOne(dto: SectorUpdateDto): Promise<SectorRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
