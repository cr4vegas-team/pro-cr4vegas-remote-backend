import { ControlEntity } from './../control/control.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('orders')
export class OrderEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // ==================================================
    
    @ManyToOne(type => ControlEntity, controlEntity => controlEntity.orders)
    @JoinColumn()
    control: ControlEntity;

    // ==================================================
    
    @Column({
        type: 'varchar',
        nullable: false,
    })
    message: string;

    // ==================================================
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    active: number;

    // ==================================================
    
    @CreateDateColumn({
        type: 'timestamp'
    })
    created: Date;

    // ==================================================
    
    @UpdateDateColumn({
        type: 'timestamp'
    })
    updated: Date;

}