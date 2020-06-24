import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../../entity/unit.entity";

@Entity('units-hydrant')
export class UnitHydrantEntity {

    @OneToOne(type => UnitEntity, { primary: true })
    @JoinColumn({ name: 'unit_code' })
    unit: UnitEntity;

    @Column()
    diameter: number;

    @Column({ default: false })
    filter: boolean;

}