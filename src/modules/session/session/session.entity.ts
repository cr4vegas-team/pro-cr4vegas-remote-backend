/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegistryEntity } from '../registry/registry.entity';
import { OrderEntity } from '../order/order.entity';
import { ActionEntity } from '../action/action.entity';
import { UserEntity } from '../../auth/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
