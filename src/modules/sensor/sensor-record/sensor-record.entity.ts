import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { SensorEntity } from "../sensor.entity";

@Entity('sensors_records')
export class SensorRecordEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => SensorEntity, {
        nullable: false,
        eager: true
    })
    sensor: SensorEntity;

    @Column({
        type: 'varchar',
        length: 255,
    })
    message: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    created: Date;

}