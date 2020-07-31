import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";


@Entity('units_hydrants')
export class UnitHydrantEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        unique: true,
        type: 'varchar',
        length: 45
    })
    code: string;

    @OneToOne(type => UnitEntity, { eager: true })
    @JoinColumn({ name: 'unit_id', referencedColumnName: 'id' })
    unit: UnitEntity;

    @Column({
        type: 'int'
    })
    diameter: number;

    @Column({
        type: 'boolean',
    })
    filter: boolean;

}