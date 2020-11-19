"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsGenericsRO = exports.UnitGenericRO = void 0;
const openapi = require("@nestjs/swagger");
class UnitGenericRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitGeneric: { required: true, type: () => require("../unit-generic.entity").UnitGenericEntity } };
    }
}
exports.UnitGenericRO = UnitGenericRO;
class UnitsGenericsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { unitsGenerics: { required: true, type: () => [require("../unit-generic.entity").UnitGenericEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.UnitsGenericsRO = UnitsGenericsRO;
//# sourceMappingURL=unit-generic-response.dto.js.map