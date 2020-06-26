import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { SensorEntity } from "../sensor.entity";

@Entity('sensors-records')
export class SensorRecordEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => SensorEntity, {
        nullable: false,
        eager: true
    })
    sensor: SensorEntity;

    

}