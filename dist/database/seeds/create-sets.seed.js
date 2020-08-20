"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set_entity_1 = require("../../modules/wrap/set/set.entity");
class CreateSets {
    async run(factory, connection) {
        await factory(set_entity_1.SetEntity)().createMany(20);
    }
}
exports.default = CreateSets;
//# sourceMappingURL=create-sets.seed.js.map