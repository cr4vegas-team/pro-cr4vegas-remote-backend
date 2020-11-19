import { RegistryEntity } from '../registry/registry.entity';
import { OrderEntity } from '../order/order.entity';
import { ActionEntity } from '../action/action.entity';
import { UserEntity } from '../../auth/user/user.entity';
export declare class SessionEntity {
    id: number;
    user: UserEntity;
    action: ActionEntity[];
    orders: OrderEntity[];
    registries: RegistryEntity[];
    active: number;
    started: Date;
    finished: Date;
}
