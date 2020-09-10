import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SectorEntity } from "../../wrap/sector/sector.entity";
import { SetEntity } from "../../wrap/set/set.entity";
import { StationEntity } from "../../wrap/station/station.entity";
import { UnitTypeEnum } from "./unit-type.enum";

@Entity('units')
export class UnitEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // =======================================

    @ManyToOne(type => StationEntity, stationEntity => stationEntity.units)
    @JoinColumn()
    station: StationEntity;

    // =======================================

    @ManyToOne(type => SectorEntity, sectorEntity => sectorEntity.units)
    @JoinColumn()
    sector: SectorEntity;

    // =======================================

    @ManyToMany(type => SetEntity, setEntity => setEntity.units)
    @JoinTable()
    sets: SetEntity[];

    // =======================================

    @Column({
        name: 'unit_type',
        type: 'enum',
        enum: UnitTypeEnum,
        default: UnitTypeEnum.NA,
    })
    unitType: UnitTypeEnum;

    // =======================================

    @Column({
        unique: true,
        type: 'varchar',
        length: 45,
        default: UnitTypeEnum.NA,
    })
    code: string;

    // =======================================

    @Column({
        type: 'varchar',
        length: 45,
        default: UnitTypeEnum.NA,
    })
    table: string;

    // =======================================

    @Column({
        type: 'float',
    })
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