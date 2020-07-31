import Faker from 'faker';
import { SetTypeEntity } from '../../modules/wrap/set/set-type.entity';
import { define } from "typeorm-seeding";

define(SetTypeEntity, (faker: typeof Faker) => {
    faker.seed(faker.random.number(99999999999999));
    const setType: SetTypeEntity = new SetTypeEntity();
    setType.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    return setType;
});