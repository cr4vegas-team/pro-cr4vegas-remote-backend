"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistriesRO = exports.RegistryRO = void 0;
const openapi = require("@nestjs/swagger");
class RegistryRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { registry: { required: true, type: () => require("../registry.entity").RegistryEntity } };
    }
}
exports.RegistryRO = RegistryRO;
class RegistriesRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { registries: { required: true, type: () => [require("../registry.entity").RegistryEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.RegistriesRO = RegistriesRO;
//# sourceMappingURL=registry-response.dto.js.map