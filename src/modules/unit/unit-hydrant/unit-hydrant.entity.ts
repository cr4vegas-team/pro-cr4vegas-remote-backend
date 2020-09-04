import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";


@Entity('units_hydrants')
export class UnitHydrantEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // =======================================

    @OneToOne(type => UnitEntity, { eager: true, cascade: true })
    @JoinColumn()
    unit: UnitEntity;

    // =======================================

    @Column({
        type: 'int',
        default: 0,
    })
    diameter: number;

    // =======================================

    @Column({
        type: 'tinyint',
        default: 0,
    })
    filter: number;

}