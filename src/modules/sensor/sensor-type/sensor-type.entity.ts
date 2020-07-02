import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('sensors_types')
export class SensorTypeEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================
    
    @Column({
        type: 'varchar',
        length: 15
    })
    name: string;

    // =======================================

    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;

}