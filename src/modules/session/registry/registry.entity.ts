/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
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
  method: string;

  // ==================================================

  @Column({
    type: 'varchar',
    nullable: false,
  })
  originalUrl: string;

  // ==================================================

  @Column({
    type: 'text',
    nullable: false,
  })
  body: string;

  // ==================================================

  @CreateDateColumn({
    type: 'varchar',
  })
  created: Date;
}
