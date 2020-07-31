import { Entity, PrimaryColumn } from "typeorm";


@Entity('sets-types')
export class SetTypeEntity {

    @PrimaryColumn({
        type: 'varchar',
        length: 45
    })
    name: string;

}