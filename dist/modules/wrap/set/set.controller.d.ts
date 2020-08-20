import { SetDto } from './set.dto';
import { SetRO, SetsRO } from './set.interfaces';
import { SetService } from './set.service';
export declare class SetController {
    private readonly _setService;
    constructor(_setService: SetService);
    findAll(active: number): Promise<SetsRO>;
    findOne(id: number, active: number): Promise<SetRO>;
    createOne(dto: SetDto): Promise<SetRO>;
    updateOne(id: number, dto: SetDto): Promise<boolean>;
    deleteOne(id: number): Promise<boolean>;
    activateOne(id: number): Promise<boolean>;
}
