
import { SetTypeEntity } from "../../modules/wrap/set/set-type.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateSetTypes implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(SetTypeEntity)().createMany(20)
    }
}