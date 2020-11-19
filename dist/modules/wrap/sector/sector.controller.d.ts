import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorRO, SectorsRO } from './dto/sector-response.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorService } from './sector.service';
export declare class SectorController {
    private readonly _sectorService;
    constructor(_sectorService: SectorService);
    findAll(): Promise<SectorsRO>;
    findOne(id: number): Promise<SectorRO>;
    createOne(dto: SectorCreateDto): Promise<SectorRO>;
    updateOne(dto: SectorUpdateDto): Promise<SectorRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
