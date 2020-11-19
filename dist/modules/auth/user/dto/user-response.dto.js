"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRO = exports.UserRO = exports.UserDto = void 0;
const openapi = require("@nestjs/swagger");
class UserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, email: { required: true, type: () => String }, role: { required: true, enum: require("../user-role.enum").UserRole }, active: { required: true, type: () => Number } };
    }
}
exports.UserDto = UserDto;
class UserRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("./user-response.dto").UserDto } };
    }
}
exports.UserRO = UserRO;
class UsersRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { users: { required: true, type: () => [require("./user-response.dto").UserDto] }, count: { required: true, type: () => Number } };
    }
}
exports.UsersRO = UsersRO;
//# sourceMappingURL=user-response.dto.js.map