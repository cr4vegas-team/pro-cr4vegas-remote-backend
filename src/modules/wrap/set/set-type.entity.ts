import { IsString } from "class-validator";
import { Entity, PrimaryColumn } from "typeorm";


@Entity('sets_types')
export class SetTypeEntity {

    @IsString()
    @PrimaryColumn({
        type: 'varchar',
        length: 45
    })
    name: string;

}