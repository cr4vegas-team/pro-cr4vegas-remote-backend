"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRO = exports.SetsRO = void 0;
const openapi = require("@nestjs/swagger");
class SetsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { sets: { required: true, type: () => [require("../set.entity").SetEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.SetsRO = SetsRO;
class SetRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { set: { required: true, type: () => require("../set.entity").SetEntity } };
    }
}
exports.SetRO = SetRO;
//# sourceMappingURL=set-response.dto.js.map