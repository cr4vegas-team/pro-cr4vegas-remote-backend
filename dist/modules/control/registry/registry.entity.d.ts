import { ControlEntity } from './../control/control.entity';
export declare class RegistryEntity {
    id: number;
    control: ControlEntity;
    message: string;
    active: number;
    created: Date;
}
