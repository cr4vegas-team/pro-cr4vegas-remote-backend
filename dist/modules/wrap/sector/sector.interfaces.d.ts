import { SectorEntity } from "./sector.entity";
export interface SectorsRO {
    sectors: SectorEntity[];
    count: number;
}
export interface SectorRO {
    sector: SectorEntity;
}
