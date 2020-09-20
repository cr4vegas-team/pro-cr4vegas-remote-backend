import { ControlEntity } from './../control/control.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('registries')
export class RegistryEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // ==================================================
    
    @ManyToOne(type => ControlEntity, controlEntity => controlEntity.registries)
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
        default: 1,
    })
    active: number;

    // ==================================================
    
    @CreateDateColumn({
        type: 'varchar'
    })
    created: Date;

}