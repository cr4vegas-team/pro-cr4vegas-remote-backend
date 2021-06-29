/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";


@Entity('units_ponds')
export class UnitPondEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UnitEntity, { eager: true })
    @JoinColumn()
    unit: UnitEntity;

    @Column({
        type: 'bigint',
        nullable: true
    })
    m3: number;

    @Column({
        type: 'float',
        nullable: true
    })
    height: number;
}