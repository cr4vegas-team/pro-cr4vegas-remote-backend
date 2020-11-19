"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsPondsRO = exports.UnitPondRO = void 0;
const openapi = require("@nestjs/swagger");
class UnitPondRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitPond: { required: true, type: () => require("../unit-pond.entity").UnitPondEntity } };
    }
}
exports.UnitPondRO = UnitPondRO;
class UnitsPondsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitsPonds: { required: true, type: () => [require("../unit-pond.entity").UnitPondEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.UnitsPondsRO = UnitsPondsRO;
//# sourceMappingURL=unit-pond-response.dto.js.map