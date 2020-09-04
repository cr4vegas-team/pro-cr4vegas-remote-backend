import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";


@Entity('units_generics')
export class UnitGenericEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // =======================================

    @OneToOne(type => UnitEntity, { eager: true, cascade: true })
    @JoinColumn()
    unit: UnitEntity;

    // =======================================

    @Column({
        type: 'varchar',
        default: null,
    })
    data1: string;

    // =======================================

    @Column({
        type: 'varchar',
        default: null,
    })
    data2: string;

    // =======================================

    @Column({
        type: 'varchar',
        default: null,
    })
    data3: string;

    // =======================================

    @Column({
        type: 'varchar',
        default: null,
    })
    data4: string;

    // =======================================

    @Column({
        type: 'varchar',
        default: null,
    })
    data5: string;

}