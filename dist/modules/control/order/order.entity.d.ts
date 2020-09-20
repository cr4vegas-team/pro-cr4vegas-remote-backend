import { ControlEntity } from './../control/control.entity';
export declare class OrderEntity {
    id: number;
    control: ControlEntity;
    message: string;
    active: number;
    created: Date;
    updated: Date;
}
