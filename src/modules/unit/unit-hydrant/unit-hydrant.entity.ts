/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitEntity } from '../unit/unit.entity';

@Entity('units_hydrants')
export class UnitHydrantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // =======================================

  @OneToOne(type => UnitEntity, { eager: true, nullable: false })
  @JoinColumn()
  unit: UnitEntity;

  // =======================================

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  diameter: number;

  // =======================================

  @Column({
    type: 'tinyint',
    nullable: true,
  })
  filter: number;
}
