import Faker from 'faker';
import { SetTypeEntity } from '../../modules/wrap/set/set-type.entity';
import { SetEntity } from '../../modules/wrap/set/set.entity';
import { define, factory } from "typeorm-seeding";

define(SetEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const set: SetEntity = new SetEntity();
    set.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    set.description = faker.lorem.lines(3);
    set.setType = factory(SetTypeEntity)() as any;
    return set;
});