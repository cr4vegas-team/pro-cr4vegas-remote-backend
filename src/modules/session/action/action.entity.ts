/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnitEntity } from '../../unit/unit/unit.entity';
import { SessionEntity } from '../session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('actions')
export class ActionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // ==================================================

  @ManyToOne(
    type => SessionEntity,
    controlEntity => controlEntity.action,
  )
  @JoinColumn()
  session: SessionEntity;

  // ==================================================

  @ManyToOne(
    type => UnitEntity,
    unitEntity => unitEntity.actions,
  )
  @JoinColumn()
  unit: UnitEntity;

  // ==================================================

  @Column({
    type: 'varchar',
    length: 255,
  })
  action: string;

  // ==================================================

  @CreateDateColumn({
    type: 'timestamp',
  })
  created: Date;
}
