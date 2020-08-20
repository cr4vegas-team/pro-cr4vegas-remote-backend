import { StationDto } from './station.dto';
import { StationRO, StationsRO } from './station.interfaces';
import { StationService } from './station.service';
export declare class StationController {
    private readonly _statioService;
    constructor(_statioService: StationService);
    findAll(active: number): Promise<StationsRO>;
    findOne(id: number, active: number): Promise<StationRO>;
    createOne(dto: StationDto): Promise<StationRO>;
    updateOne(id: number, dto: StationDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
