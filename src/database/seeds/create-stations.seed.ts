
import { StationEntity } from "../../modules/wrap/station/station.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";


export default class CreateStations implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(StationEntity)().createMany(20)
    }
}