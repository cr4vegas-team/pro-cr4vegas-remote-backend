/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UnitEntity } from '../../unit/unit/unit.entity';
import { SetTypeEntity } from './set-type.entity';

@Entity('sets')
export class SetEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // =======================================

  @ManyToOne(
    type => SetTypeEntity,
    type => type.name,
  )
  @JoinColumn()
  setType: SetTypeEntity;

  // =======================================

  @ManyToMany(
    type => UnitEntity,
    unitEntity => unitEntity.sets,
  )
  units: UnitEntity[];

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
