"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set_type_entity_1 = require("../../modules/wrap/set/set-type.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
typeorm_seeding_1.define(set_type_entity_1.SetTypeEntity, (faker) => {
    faker.seed(faker.random.number(99999999999999));
    const setType = new set_type_entity_1.SetTypeEntity();
    setType.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    return setType;
});
//# sourceMappingURL=set-type.factory.js.map