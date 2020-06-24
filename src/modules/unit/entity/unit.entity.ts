import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('units')
export class UnitEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: '10',
        unique: true,
    })
    code: string;

    // =======================================

    @Column({
        type: 'float',
    })
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