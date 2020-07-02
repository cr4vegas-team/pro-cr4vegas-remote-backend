import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit.entity";

@Entity('units-hydrants')
export class UnitHydrantEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // =======================================

    @OneToOne(type => UnitEntity, { 
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT', 
        nullable: false, 
        eager: true, 
        cascade: true })
    @JoinColumn({ 
        name: 'unit_id', 
        referencedColumnName: 'id' })
    unit: UnitEntity;

    // =======================================

    @Column({type: 'int'})
    size: number;

    // =======================================

    @Column({type: 'bool'})
    valve: boolean;

    // =======================================

    @Column({type: 'bool'})
    bouy_alarm: boolean;

    @Column({type: 'bool'})
    bouy_high: boolean;

    @Column({type: 'bool'})
    bouy_medium: boolean;

    @Column({type: 'float'})
    flow: number;

    @Column({type: 'int'})
    counter: number;

}