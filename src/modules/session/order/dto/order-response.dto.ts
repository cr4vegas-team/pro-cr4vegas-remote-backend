import { OrderEntity } from '../order.entity';


export class OrderRO {
    order: OrderEntity;
}

export class OrdersRO {
    orders: OrderEntity[];
    count: number;
}