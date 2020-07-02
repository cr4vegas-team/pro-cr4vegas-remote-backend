import { MicroEntity } from "./micro.entity";
import { ReadMicroDto } from "./dto";


export interface MicroRO {
    micro: ReadMicroDto;
}

export interface MicrosRO {
    micros: ReadMicroDto[];
    microsCount: number;
}