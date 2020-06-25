import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UnitEntity } from "src/modules/unit/entity/unit.entity";
import { type } from "os";

@Entity('micros')
export class MicroEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @ManyToOne(type => UnitEntity)
    @JoinColumn({ name: 'unit_code' })
    unit: UnitEntity;

    // =======================================

    @Column({
        type: 'boolean',
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

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    created: Date;

    // =======================================

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updated: Date;

}