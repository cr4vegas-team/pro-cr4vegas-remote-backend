import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitType } from "./unit-types.constant";

@Entity('units')
export class UnitEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @Column({
        name: 'unit_type',
        type: 'enum',
        enum: UnitType,
        nullable: false,
    })
    unitType: UnitType;

    // =======================================

    @Column({
        type: 'float',
    })
    @Exclude()
    altitude: number;

    // =======================================

    @Column({
        type: 'float',
    })
    latitude: number;

    // =======================================

    @Column({
        type: 'float',
    })
    longitude: number;

    // =======================================

    @Column({
        type: 'varchar',
        length: '500',
    })
    description: string;

    // =======================================

    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;

    // =======================================

    @CreateDateColumn({
        type: "timestamp",
    })
    created: Date;

    // =======================================

    @UpdateDateColumn({
        type: "timestamp",
    })
    updated: Date;
}