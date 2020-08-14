import { Exclude } from "class-transformer";
import { SectorEntity } from "../../wrap/sector/sector.entity";
import { SetEntity } from "../../wrap/set/set.entity";
import { StationEntity } from "../../wrap/station/station.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UnitType } from "./unit-types.constant";

@Entity('units')
export class UnitEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @ManyToOne(type => StationEntity, stationEntity => stationEntity.units, { eager: true })
    @JoinColumn()
    station: StationEntity;

    // =======================================

    @ManyToOne(type => SectorEntity, sectorEntity => sectorEntity.units, { eager: true })
    @JoinColumn()
    sector: SectorEntity;

    // =======================================

    @ManyToMany(type => SetEntity, setEntity => setEntity.units, { eager: true })
    @JoinColumn()
    sets: SetEntity[];

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
        unique: true,
        type: 'varchar',
        length: 45
    })
    code: string;

    // =======================================

    @Column({
        type: 'float',
    })
    @Exclude()
    altitude: number;

    // =======================================

    @Column({
        type: 'double',
    })
    latitude: number;

    // =======================================

    @Column({
        type: 'double',
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
        type: 'tinyint',
        default: 1
    })
    active: number;

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