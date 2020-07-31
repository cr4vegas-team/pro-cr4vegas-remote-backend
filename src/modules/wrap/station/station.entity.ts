import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stations')
export class StationEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        length: 15,
        unique: true,
        nullable: false
    })
    code: string;

    @Column({
        type: 'varchar',
        length: 45,
        unique: true,
        nullable: false
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