import { UnitEntity } from "../../unit/unit/unit.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stations')
export class StationEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @OneToMany(type => UnitEntity, unitEntity => unitEntity.station)
    units: UnitEntity[];

    // =======================================

    @Column({
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: false
    })
    code: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 45,
        unique: true,
        nullable: false
    })
    name: string;

    // =======================================

    @Column({
        type: 'float',
        default: 0,
    })
    altitude: number;

    // =======================================

    @Column({
        type: 'double',
        default: 0,
    })
    latitude: number;

    // =======================================

    @Column({
        type: 'double',
        default: 0,
    })
    longitude: number;

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
        type: 'tinyint',
        default: 1
    })
    active: number;


}