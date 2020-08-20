import { Repository } from 'typeorm';
import { StationDto } from './station.dto';
import { StationEntity } from './station.entity';
import { StationRO, StationsRO } from './station.interfaces';
export declare class StationService {
    private readonly _stationRepository;
    constructor(_stationRepository: Repository<StationEntity>);
    findAll(active?: number): Promise<StationsRO>;
    findOne(id: number, active?: number): Promise<StationRO>;
    createOne(dto: StationDto): Promise<StationRO>;
    updateOne(id: number, dto: StationDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
