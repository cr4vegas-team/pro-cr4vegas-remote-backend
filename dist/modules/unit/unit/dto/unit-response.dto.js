"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsRO = exports.UnitRO = void 0;
const openapi = require("@nestjs/swagger");
class UnitRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unit: { required: true, type: () => require("../unit.entity").UnitEntity } };
    }
}
exports.UnitRO = UnitRO;
class UnitsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { units: { required: true, type: () => [require("../unit.entity").UnitEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.UnitsRO = UnitsRO;
//# sourceMappingURL=unit-response.dto.js.map