/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from 'typeorm';
import { UnitEntity } from '../unit/unit.entity';

@Entity('unit_station_pechina')
export class UnitStationPechinaEntity {

  @PrimaryColumn()
  id: number;

  @OneToOne(type => UnitEntity, { eager: true })
  @JoinColumn()
  unit: UnitEntity;

  @Column({
    type: 'int',
  })
  readingBatch: number;
}
