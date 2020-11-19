/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';

@Entity('registries')
export class RegistryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // ==================================================

  @ManyToOne(
    type => SessionEntity,
    sessionEntity => sessionEntity.registries,
  )
  session: SessionEntity;

  // ==================================================

  @Column({
    type: 'varchar',
    nullable: false,
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
    type: 'varchar',
  })
  created: Date;
}
