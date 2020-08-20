import { SectorDto } from './sector.dto';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorService } from './sector.service';
export declare class SectorController {
    private readonly _sectorService;
    constructor(_sectorService: SectorService);
    findAll(active: number): Promise<SectorsRO>;
    findOne(id: number, active: number): Promise<SectorRO>;
    createOne(dto: SectorDto): Promise<SectorRO>;
    updateOne(id: number, dto: SectorDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
