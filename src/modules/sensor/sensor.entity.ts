import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MicroEntity } from "../micro/micro.entity";
import { SensorTypeEntity } from "./sensor-type/sensor-type.entity";


@Entity('sensors')
export class SensorEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @ManyToOne(type => MicroEntity, micro => micro.sensors, { eager: true })
    @JoinColumn({ name: 'micro_id' })
    micro: MicroEntity;

    // =======================================

    @OneToOne(type => SensorTypeEntity, {
        nullable: false,
        eager: true
    })
    @JoinColumn({ name: 'sensor_type' })
    sensor_type: SensorTypeEntity;

    // =======================================

    @Column({
        type: 'varchar',
        length: 25,
        nullable: true
    })
    mark: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 25,
        nullable: true
    })
    model: string;

    // =======================================

    @Column({
        type: 'boolean',
        default: false
    })
    save: boolean;

    // =======================================

    @Column({
        type: 'boolean',
        default: false
    })
    limits: boolean;

    // =======================================

    @Column({
        type: 'int',
        default: 0
    })
    min: number;

    // =======================================

    @Column({
        type: 'int',
        default: 0
    })
    max: number;

    // =======================================

    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;

    // =======================================

    @CreateDateColumn({
        type: "timestamp",
    })
    created: Date;

    // =======================================

    @UpdateDateColumn({
        type: "timestamp",
    })
    updated: Date;

}