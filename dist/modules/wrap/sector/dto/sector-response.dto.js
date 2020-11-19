"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorRO = exports.SectorsRO = void 0;
const openapi = require("@nestjs/swagger");
class SectorsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { sectors: { required: true, type: () => [require("../sector.entity").SectorEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.SectorsRO = SectorsRO;
class SectorRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { sector: { required: true, type: () => require("../sector.entity").SectorEntity } };
    }
}
exports.SectorRO = SectorRO;
//# sourceMappingURL=sector-response.dto.js.map