"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationRO = exports.StationsRO = void 0;
const openapi = require("@nestjs/swagger");
class StationsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { stations: { required: true, type: () => [require("../station.entity").StationEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.StationsRO = StationsRO;
class StationRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { station: { required: true, type: () => require("../station.entity").StationEntity } };
    }
}
exports.StationRO = StationRO;
//# sourceMappingURL=station-response.dto.js.map