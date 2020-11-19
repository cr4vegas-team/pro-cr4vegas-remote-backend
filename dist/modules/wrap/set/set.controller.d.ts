import { SetCreateDto } from './dto/set-create.dto';
import { SetRO, SetsRO } from './dto/set-response.dto';
import { SetTypeUpdateDto } from './dto/set-type-update.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetTypeEntity } from './set-type.entity';
import { SetService } from './set.service';
export declare class SetController {
    private readonly _setService;
    constructor(_setService: SetService);
    findAll(): Promise<SetsRO>;
    findOne(id: number): Promise<SetRO>;
    createOne(dto: SetCreateDto): Promise<SetRO>;
    updateOne(dto: SetUpdateDto): Promise<SetRO>;
    findAllSetTypes(): Promise<SetTypeEntity[]>;
    insertSetType(dto: SetTypeEntity): Promise<SetTypeEntity>;
    deleteSetType(name: string): Promise<boolean>;
    updateSetType(dto: SetTypeUpdateDto): Promise<SetTypeEntity>;
}
