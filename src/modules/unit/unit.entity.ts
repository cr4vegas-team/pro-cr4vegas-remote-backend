import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MicroEntity } from "../../modules/micro/micro.entity";

@Entity('units')
export class UnitEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @OneToMany(type => MicroEntity, micro => micro.unit, {})
    micros: MicroEntity[];

    // =======================================

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    code: string;

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