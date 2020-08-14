import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";


@Entity('units_hydrants')
export class UnitHydrantEntity {

    @PrimaryColumn({
        unique: true,
        type: 'varchar',
        length: 45
    })
    code: string;

    // =======================================

    @OneToOne(type => UnitEntity, { eager: true })
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