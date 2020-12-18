import { UnitPondGateway } from './unit-pond.gateway';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondRO, UnitsPondsRO } from './dto/unit-pond-response.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondService } from './unit-pond.service';
import { MqttContext } from '@nestjs/microservices';
export declare class UnitPondController {
    private readonly _unitPondService;
    private readonly _unitPondGateway;
    constructor(_unitPondService: UnitPondService, _unitPondGateway: UnitPondGateway);
    getNotifications(message: number[], context: MqttContext): Promise<any>;
    findAll(): Promise<UnitsPondsRO>;
    findOne(id: number): Promise<UnitPondRO>;
    createOne(dto: UnitPondCreateDto): Promise<UnitPondRO>;
    updateOne(dto: UnitPondUpdateDto): Promise<UnitPondRO>;
}
