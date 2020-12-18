import { UnitGenericGateway } from './unit-generic.gateway';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericRO, UnitsGenericsRO } from './dto/unit-generic-response.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericService } from './unit-generic.service';
import { MqttContext } from '@nestjs/microservices';
export declare class UnitGenericController {
    private readonly _unitGenericService;
    private readonly _unitGenericGateway;
    constructor(_unitGenericService: UnitGenericService, _unitGenericGateway: UnitGenericGateway);
    getNotifications(message: number[], context: MqttContext): Promise<any>;
    findAll(): Promise<UnitsGenericsRO>;
    findOne(id: number): Promise<UnitGenericRO>;
    createOne(dto: UnitGenericCreateDto): Promise<UnitGenericRO>;
    updateOne(dto: UnitGenericUpdateDto): Promise<UnitGenericRO>;
}
