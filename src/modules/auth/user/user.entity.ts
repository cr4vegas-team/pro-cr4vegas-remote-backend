/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SessionEntity } from '../../session/session/session.entity';
import { UserRole } from './user-role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // ==================================================

  @OneToMany(
    type => SessionEntity,
    sessionEntity => sessionEntity.user,
  )
  sessions: SessionEntity[];

  // ==================================================

  @Column({
    type: 'varchar',
    length: 45,
    unique: true,
  })
  username: string;

  // ==================================================

  @Column({
    type: 'varchar',
    length: 225,
    unique: true,
  })
  email: string;

  // ==================================================

  @Column({
    type: 'varchar',
    length: 250,
  })
  password: string;

  // ==================================================

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole;

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

  // ==================================================

  @BeforeInsert()
  generatePasswordHash(): void {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
