import { ControlEntity } from './../../control/control/control.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // ==================================================

    @OneToMany(type => ControlEntity, controlEntity => controlEntity.user)
    controls: ControlEntity[];

    // ==================================================
    
    @Column({
        type: 'varchar',
        length: 45,
        unique: true,
        nullable: false
    })
    username: string;

    // ==================================================
    
    @Column({
        type: 'varchar',
        length: 225,
        unique: true,
        nullable: false
    })
    email: string;

    // ==================================================
    
    @Column({
        type: 'varchar',
        length: 250,
        nullable: false
    })
    password: string;

    // ==================================================

    @Column({
        type: 'boolean',
        default: true
    })
    active: boolean;

    // ==================================================

    @CreateDateColumn({
        type: "timestamp",
    })
    created: Date;

    // ==================================================

    @UpdateDateColumn({
        type: "timestamp",
    })
    updated: Date;

    // ==================================================

    @BeforeInsert()
    generatePasswordHash() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}