import { SensorEntity } from "../../modules/sensor/sensor.entity";
import { UnitEntity } from "../../modules/unit/unit.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('micros')
export class MicroEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @ManyToOne(type => UnitEntity, unit => unit.micros, { eager: true })
    @JoinColumn({ name: 'unit_code' })
    unit: UnitEntity;

    // =======================================

    @OneToMany(type => SensorEntity, sensor => sensor.micro)
    sensors: SensorEntity[];

    // =======================================

    @Column({
        type: 'bool',
        default: false
    })
    communication: boolean;

    // =======================================

    @Column({
        type: 'tinyint',
        default: 0,
    })
    priority: number;

    // =======================================

    @Column({
        type: 'varchar',
        length: 25,
    })
    mark: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 25,
    })
    model: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 25,
    })
    code: string;

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