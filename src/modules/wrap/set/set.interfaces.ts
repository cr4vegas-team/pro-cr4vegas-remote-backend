import { SetEntity } from "./set.entity";


export interface SetsRO {
    sets: SetEntity[],
    count: number
}

export interface SetRO {
    set: SetEntity
}