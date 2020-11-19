import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitEntity } from '../unit/unit.entity';

@Entity('units_generics')
export class UnitGenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // =======================================

  @OneToOne(() => UnitEntity)
  @JoinColumn()
  unit: UnitEntity;

  // =======================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  data1: string;

  // =======================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  data2: string;

  // =======================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  data3: string;

  // =======================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  data4: string;

  // =======================================

  @Column({
    type: 'varchar',
    nullable: true,
  })
  data5: string;
}
