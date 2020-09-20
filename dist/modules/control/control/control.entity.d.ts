import { RegistryEntity } from './../registry/registry.entity';
import { OrderEntity } from './../order/order.entity';
import { ManageEntity } from './../manage/manage.entity';
import { UserEntity } from './../../auth/user/user.entity';
export declare class ControlEntity {
    id: number;
    user: UserEntity;
    manages: ManageEntity[];
    orders: OrderEntity[];
    registries: RegistryEntity[];
    active: number;
    started: Date;
    finished: Date;
}
