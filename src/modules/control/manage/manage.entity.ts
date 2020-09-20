import { UnitEntity } from '../../unit/unit/unit.entity';
import { ControlEntity } from './../control/control.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('manages')
export class ManageEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    // ==================================================
    
    @ManyToOne(type => ControlEntity, controlEntity => controlEntity.manages)
    @JoinColumn()
    control: ControlEntity;

    // ==================================================
    
    @ManyToOne(type => UnitEntity, unitEntity => unitEntity.manages)
    @JoinColumn()
    unit: UnitEntity;

    // ==================================================
    
    @CreateDateColumn({
        type: 'timestamp',
    })
    created: Date;

}