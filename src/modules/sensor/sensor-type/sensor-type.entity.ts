import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('sensors_types')
export class SensorTypeEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: '15'
    })
    type: string;

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