
import { UnitEntity } from "../../modules/unit/unit/unit.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateUnits implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(UnitEntity)().createMany(20)
    }
}