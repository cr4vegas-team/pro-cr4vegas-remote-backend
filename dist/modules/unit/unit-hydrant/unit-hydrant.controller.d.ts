import { UnitHydrantGateway } from './unit-hydrant.gateway';
import { MqttContext } from '@nestjs/microservices';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantRO, UnitsHydrantsRO } from './dto/unit-hydrant-response.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantService } from './unit-hydrant.service';
export declare class UnitHydrantController {
    private readonly _unitHydrantService;
    private readonly _unitHydrantGateway;
    constructor(_unitHydrantService: UnitHydrantService, _unitHydrantGateway: UnitHydrantGateway);
    getNotifications(message: number[], context: MqttContext): Promise<any>;
    findAll(): Promise<UnitsHydrantsRO>;
    findOne(id: number): Promise<UnitHydrantRO>;
    createOne(dto: UnitHydrantCreateDto): Promise<UnitHydrantRO>;
    updateOne(dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO>;
}
