/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActionEntity } from '../../session/action/action.entity';
import { SectorEntity } from '../../wrap/sector/sector.entity';
import { SetEntity } from '../../wrap/set/set.entity';
import { StationEntity } from '../../wrap/station/station.entity';
import { UnitTypeTableEnum } from './unit-type.enum';

@Entity('units')
export class UnitEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // =======================================

  @ManyToOne(
    type => StationEntity,
    stationEntity => stationEntity.units,
  )
  @JoinColumn()
  station: StationEntity;

  // =======================================

  @ManyToOne(
    type => SectorEntity,
    sectorEntity => sectorEntity.units,
  )
  @JoinColumn()
  sector: SectorEntity;

  // =======================================

  @ManyToMany(
    type => SetEntity,
    setEntity => setEntity.units,
  )
  @JoinTable()
  sets: SetEntity[];

  // ==================================================

  @OneToMany(
    type => ActionEntity,
    actionEntity => actionEntity.unit,
  )
  actions: ActionEntity[];

  // =======================================

  @Column({
    type: 'enum',
    enum: UnitTypeTableEnum,
    default: UnitTypeTableEnum.UNIT_GENERIC,
    nullable: true,
  })
  unitTypeTable: UnitTypeTableEnum;

  // =======================================

  @Column({
    type: 'int',
  })
  code: number;

  // =======================================

  @Column({
    type: 'int',
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
    type: 'text',
    nullable: true,
  })
  description: string;

  // =======================================

  @Column({
    type: 'tinyint',
    default: 1,
  })
  active: number;

  // ==================================================
  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string;

  // =======================================

  @CreateDateColumn({
    type: 'timestamp',
  })
  created: Date;

  // =======================================

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated: Date;
}
