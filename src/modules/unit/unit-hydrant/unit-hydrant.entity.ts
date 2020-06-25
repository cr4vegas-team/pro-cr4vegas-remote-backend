import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit.entity";

@Entity('units-hydrants')
export class UnitHydrantEntity {

    @OneToOne(type => UnitEntity, { 
        primary: true, 
        cascade: true, 
        nullable: false, 
        eager: true })
    @JoinColumn({ name: 'unit_code' })
    unit: UnitEntity;

    @Column()
    diameter: number;

    @Column({ default: false })
    filter: boolean;

}