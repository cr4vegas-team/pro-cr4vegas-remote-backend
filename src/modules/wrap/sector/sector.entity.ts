/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UnitEntity } from '../../unit/unit/unit.entity';

@Entity('sectors')
export class SectorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // =======================================

  @OneToMany(
    type => UnitEntity,
    unitEntity => unitEntity.sector,
  )
  units: UnitEntity[];

  // =======================================

  @Column({
    type: 'varchar',
    length: 5,
    unique: true,
  })
  code: string;

  // =======================================

  @Column({
    type: 'varchar',
    length: 45,
    unique: true,
  })
  name: string;

  // =======================================

  @Column({
    type: 'text',
    nullable: true,
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
    default: 1,
  })
  active: number;

  // ==================================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string;
}
