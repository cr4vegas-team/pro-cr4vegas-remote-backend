"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set_type_entity_1 = require("../../modules/wrap/set/set-type.entity");
const set_entity_1 = require("../../modules/wrap/set/set.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
typeorm_seeding_1.define(set_entity_1.SetEntity, (faker) => {
    faker.seed(faker.random.number(99999999999999));
    const set = new set_entity_1.SetEntity();
    set.code = 'ST' + faker.random.alphaNumeric(10);
    set.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    set.description = faker.lorem.lines(3);
    set.setType = typeorm_seeding_1.factory(set_type_entity_1.SetTypeEntity)();
    return set;
});
//# sourceMappingURL=set.factory.js.map