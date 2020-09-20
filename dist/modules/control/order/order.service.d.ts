import { ControlService } from './../control/control.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderRO, OrdersRO } from './order.interfaces';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderUpdateDto } from './dto/order-update.dto';
export declare class OrderService {
    private readonly _orderRepository;
    private readonly _controlService;
    constructor(_orderRepository: Repository<OrderEntity>, _controlService: ControlService);
    findAll(): Promise<OrdersRO>;
    findAllByControlid(controlId: number): Promise<OrdersRO>;
    insertOne(orderCreateDto: OrderCreateDto): Promise<OrderRO>;
    updateOne(orderUpdateDto: OrderUpdateDto): Promise<OrderRO>;
    deactivate(id: number): Promise<boolean>;
    activate(id: number): Promise<boolean>;
}
