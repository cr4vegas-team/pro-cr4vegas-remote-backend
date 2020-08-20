"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set_type_entity_1 = require("../../modules/wrap/set/set-type.entity");
class CreateSetTypes {
    async run(factory, connection) {
        await factory(set_type_entity_1.SetTypeEntity)().createMany(20);
    }
}
exports.default = CreateSetTypes;
//# sourceMappingURL=create-sets-types.seed.js.map