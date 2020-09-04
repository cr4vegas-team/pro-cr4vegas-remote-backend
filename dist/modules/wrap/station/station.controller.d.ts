import { StationCreateDto } from './dto/station-create.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationRO, StationsRO } from './station.interfaces';
import { StationService } from './station.service';
export declare class StationController {
    private readonly _statioService;
    constructor(_statioService: StationService);
    findAll(): Promise<StationsRO>;
    findOne(id: number): Promise<StationRO>;
    createOne(dto: StationCreateDto): Promise<StationRO>;
    updateOne(dto: StationUpdateDto): Promise<StationRO>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
