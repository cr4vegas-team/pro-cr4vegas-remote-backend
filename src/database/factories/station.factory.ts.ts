import Faker from 'faker';
import { StationEntity } from '../../modules/wrap/station/station.entity';
import { define } from "typeorm-seeding";

define(StationEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const station: StationEntity = new StationEntity();
    station.code = 'ST' + faker.random.alphaNumeric(10);
    station.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    station.description = faker.lorem.lines(3);
    return station;
});