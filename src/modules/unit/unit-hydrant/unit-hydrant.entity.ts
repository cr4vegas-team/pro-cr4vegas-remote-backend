import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit.entity";

@Entity('units-hydrants')
export class UnitHydrantEntity {

    @OneToOne(type => UnitEntity, {
        primary: true,
        cascade: true,
        nullable: false,
        eager: true
    })
    @JoinColumn({ name: 'unit_code' })
    unit: UnitEntity;

    // =======================================

    @Column()
    diameter: number;

    // =======================================

    @Column({ default: false })
    filter: boolean;

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