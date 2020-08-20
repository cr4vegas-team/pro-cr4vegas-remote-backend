"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sector_entity_1 = require("../../modules/wrap/sector/sector.entity");
class CreateSectors {
    async run(factory, connection) {
        await factory(sector_entity_1.SectorEntity)().createMany(20);
    }
}
exports.default = CreateSectors;
//# sourceMappingURL=create-sectors.seed.js.map