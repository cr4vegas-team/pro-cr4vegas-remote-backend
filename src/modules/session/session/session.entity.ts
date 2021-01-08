/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from '../../auth/user/user.entity';
import { ActionEntity } from '../action/action.entity';
import { OrderEntity } from '../order/order.entity';
import { RegistryEntity } from '../registry/registry.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // ==================================================

  @ManyToOne(
    type => UserEntity,
    user => user.sessions,
  )
  @JoinColumn()
  user: UserEntity;

  // ==================================================

  @OneToMany(
    type => ActionEntity,
    actionEntity => actionEntity.session,
  )
  action: ActionEntity[];

  // ==================================================

  @OneToMany(
    type => OrderEntity,
    orderEntity => orderEntity.session,
  )
  orders: OrderEntity[];

  // ==================================================

  @OneToMany(
    type => RegistryEntity,
    registryEntity => registryEntity.session,
  )
  registries: RegistryEntity[];

  // ==================================================

  @Column({
    type: 'tinyint',
    default: 1,
  })
  active: number;

  // ==================================================

  @Column({
    type: 'varchar',
    nullable: true
  })
  userAgent: string;

  // ==================================================

  @Column({
    type: 'varchar',
    nullable: true
  })
  origin: string;

  // ==================================================

  @CreateDateColumn({
    type: 'timestamp',
  })
  started: Date;

  // ==================================================

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  finished: Date;
}
