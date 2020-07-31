
import { SetEntity } from "../../modules/wrap/set/set.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateSets implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(SetEntity)().createMany(20)
    }
}