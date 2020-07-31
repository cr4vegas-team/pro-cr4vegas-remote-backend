import Faker from 'faker';
import { UnitType } from '../../modules/unit/unit/unit-types.constant';
import { define } from "typeorm-seeding";
import { UnitEntity } from "../../modules/unit/unit/unit.entity";

define(UnitEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const unit = new UnitEntity();
    unit.altitude = faker.random.number(500);
    unit.latitude = Number(faker.address.latitude());
    unit.longitude = Number(faker.address.longitude());
    unit.unitType = UnitType.HYDRANT;
    unit.description = faker.lorem.lines(2);
    return unit;
});