import { OrderEntity } from './order.entity';
export interface OrderRO {
    order: OrderEntity;
}
export interface OrdersRO {
    orders: OrderEntity[];
    count: number;
}
