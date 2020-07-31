import { UnitHydrantEntity } from "../../modules/unit/unit-hydrant/unit-hydrant.entity";
import Faker from 'faker';
import { define, factory } from "typeorm-seeding";
import { UnitEntity } from "../../modules/unit/unit/unit.entity";

define(UnitHydrantEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const unitHydrant = new UnitHydrantEntity();
    unitHydrant.code = 'HD' +  faker.random.alphaNumeric(10);
    unitHydrant.diameter = faker.random.number(1200);
    unitHydrant.filter = faker.random.boolean();
    unitHydrant.unit = factory(UnitEntity)() as any;
    return unitHydrant;
});