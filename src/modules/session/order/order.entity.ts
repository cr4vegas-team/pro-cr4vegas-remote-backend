/* eslint-disable @typescript-eslint/no-unused-vars */
import { SessionEntity } from '../session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // ==================================================

  @ManyToOne(
    type => SessionEntity,
    sessionEntity => sessionEntity.orders,
  )
  @JoinColumn()
  session: SessionEntity;

  // ==================================================

  @Column({
    type: 'varchar',
  })
  message: string;

  // ==================================================

  @Column({
    type: 'tinyint',
    default: 1,
  })
  active: number;

  // ==================================================

  @CreateDateColumn({
    type: 'timestamp',
  })
  created: Date;

  // ==================================================

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated: Date;
}
