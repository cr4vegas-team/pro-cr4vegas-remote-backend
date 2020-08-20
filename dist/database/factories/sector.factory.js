"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sector_entity_1 = require("../../modules/wrap/sector/sector.entity");
const typeorm_seeding_1 = require("typeorm-seeding");
typeorm_seeding_1.define(sector_entity_1.SectorEntity, (faker) => {
    faker.seed(faker.random.number(99999999999999));
    const sector = new sector_entity_1.SectorEntity();
    sector.code = 'ST' + faker.random.alphaNumeric(10);
    sector.name = faker.random.word().slice(0, 10) + faker.random.number(999999);
    sector.description = faker.lorem.lines(3);
    return sector;
});
//# sourceMappingURL=sector.factory.js.map