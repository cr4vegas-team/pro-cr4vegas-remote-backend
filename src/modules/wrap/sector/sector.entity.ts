import { UnitEntity } from "../../unit/unit/unit.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('sectors')
export class SectorEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @OneToMany(type => UnitEntity, unitEntity => unitEntity.sector)
    units: UnitEntity[];

    // =======================================

    @Column({
        type: 'varchar',
        length: 15,
        unique: true
    })
    code: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 45,
        unique: true
    })
    name: string;

    // =======================================

    @Column({
        type: 'text',
    })
    description: string;

    // =======================================

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;

    // =======================================

    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    // =======================================
    
    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;
}