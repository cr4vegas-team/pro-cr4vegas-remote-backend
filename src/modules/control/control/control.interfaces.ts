import { ControlEntity } from "./control.entity";


export interface ControlRO {
    control: ControlEntity;
}

export interface ControlsRO {
    controls: ControlEntity[];
    count: number;
}