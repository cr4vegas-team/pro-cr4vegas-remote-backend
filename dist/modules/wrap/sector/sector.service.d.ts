import { Repository } from 'typeorm';
import { SectorDto } from './sector.dto';
import { SectorEntity } from './sector.entity';
import { SectorRO, SectorsRO } from './sector.interfaces';
export declare class SectorService {
    private readonly _sectorRepository;
    constructor(_sectorRepository: Repository<SectorEntity>);
    findAll(active?: number): Promise<SectorsRO>;
    findOne(id: number, active?: number): Promise<SectorRO>;
    createOne(dto: SectorDto): Promise<SectorRO>;
    updateOne(id: number, dto: SectorDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
