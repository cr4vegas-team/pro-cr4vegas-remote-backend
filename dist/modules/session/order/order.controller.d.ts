import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './dto/order-response.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly _orderService;
    constructor(_orderService: OrderService);
    findAll(): Promise<OrdersRO>;
    findAllBySessionId(sessionId: number): Promise<OrdersRO>;
    insertOne(orderCreateDto: OrderCreateDto): Promise<OrderRO>;
    updateOne(orderUpdateDto: OrderUpdateDto): Promise<OrderRO>;
    activate(id: number): Promise<boolean>;
    deactivate(id: number): Promise<boolean>;
}
