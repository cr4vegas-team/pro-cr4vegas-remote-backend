"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsHydrantsRO = exports.UnitHydrantRO = void 0;
const openapi = require("@nestjs/swagger");
class UnitHydrantRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitHydrant: { required: true, type: () => require("../unit-hydrant.entity").UnitHydrantEntity } };
    }
}
exports.UnitHydrantRO = UnitHydrantRO;
class UnitsHydrantsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitsHydrants: { required: true, type: () => [require("../unit-hydrant.entity").UnitHydrantEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.UnitsHydrantsRO = UnitsHydrantsRO;
//# sourceMappingURL=unit-hydrant-response.dto.js.map