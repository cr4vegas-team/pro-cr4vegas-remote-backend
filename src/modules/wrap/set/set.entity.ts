import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SetTypeEntity } from './set-type.entity';


@Entity('sets')
export class SetEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => SetTypeEntity, type => type.name, { eager: true })
    @JoinColumn({name: 'set_type', referencedColumnName: 'name'})
    setType: SetTypeEntity;

    @Column({
        type: 'varchar',
        length: 15,
        unique: true
    })
    code: string;

    @Column({
        type: 'varchar',
        length: 45,
        unique: true
    })
    name: string;

    @Column({
        type: 'text',
    })
    description: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;

}