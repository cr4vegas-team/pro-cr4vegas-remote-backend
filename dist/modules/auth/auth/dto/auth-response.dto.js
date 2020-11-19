"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRO = void 0;
const openapi = require("@nestjs/swagger");
class TokenRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String }, role: { required: true, enum: require("../../user/user-role.enum").UserRole } };
    }
}
exports.TokenRO = TokenRO;
//# sourceMappingURL=auth-response.dto.js.map