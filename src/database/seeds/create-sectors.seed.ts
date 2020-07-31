
import { SectorEntity } from "../../modules/wrap/sector/sector.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateSectors implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(SectorEntity)().createMany(20)
    }
}