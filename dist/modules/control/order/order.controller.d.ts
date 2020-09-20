import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './order.interfaces';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly _orderService;
    constructor(_orderService: OrderService);
    findAll(): Promise<OrdersRO>;
    findAllByControlId(controlId: number): Promise<OrdersRO>;
    insertOne(orderCreateDto: OrderCreateDto): Promise<OrderRO>;
    updateOne(orderUpdateDto: OrderUpdateDto): Promise<OrderRO>;
    activate(id: number): Promise<boolean>;
    deactivate(id: number): Promise<boolean>;
}
