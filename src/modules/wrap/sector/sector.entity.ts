import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('sectors')
export class SectorEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

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