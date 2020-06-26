import { Column, Entity, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { MicroEntity } from "../../modules/micro/micro.entity";

@Entity('units')
export class UnitEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: '10',
        unique: true,
    })
    code: string;

    // =======================================

    @OneToMany(type => MicroEntity, micro => micro.unit/* , {eager: true} */)
    micros: MicroEntity[];

    // =======================================

    @Column({
        type: 'float',
    })
    altitude: number;

    // =======================================

    @Column({
        type: 'float',
    })
    latitude: number;

    // =======================================

    @Column({
        type: 'float',
    })
    longitude: number;

    // =======================================

    @Column({
        type: 'varchar',
        length: '500',
    })
    description: string;

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