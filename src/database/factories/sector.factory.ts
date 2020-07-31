import Faker from 'faker';
import { SectorEntity } from '../../modules/wrap/sector/sector.entity';
import { define } from "typeorm-seeding";

define(SectorEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const sector: SectorEntity = new SectorEntity();
    sector.code = 'ST' + faker.random.alphaNumeric(10);
    sector.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    sector.description = faker.lorem.lines(3);
    return sector;
});