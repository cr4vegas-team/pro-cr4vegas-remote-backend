import { UnitHydrantEntity } from "../../modules/unit/unit-hydrant/unit-hydrant.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateUnitsHydrants implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(UnitHydrantEntity)().createMany(20);
    }
}