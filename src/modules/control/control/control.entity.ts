import { RegistryEntity } from './../registry/registry.entity';
import { OrderEntity } from './../order/order.entity';
import { ManageEntity } from './../manage/manage.entity';
import { UserEntity } from './../../auth/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('controls')
export class ControlEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // ==================================================

    @ManyToOne(type => UserEntity, user => user.controls)
    @JoinColumn()
    user: UserEntity;

    // ==================================================

    @OneToMany(type => ManageEntity, manageEntity => manageEntity.control)
    manages: ManageEntity[];

    // ==================================================

    @OneToMany(type => OrderEntity, orderEntity => orderEntity.control)
    orders: OrderEntity[];

    // ==================================================

    @OneToMany(type => RegistryEntity, registryEntity => registryEntity.control)
    registries: RegistryEntity[]

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
    started: Date;

    // ==================================================

    @Column({
        type: 'timestamp',
        nullable: true,
        default: null
    })
    finished: Date;

}