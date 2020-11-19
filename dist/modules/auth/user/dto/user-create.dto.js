"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateDto = void 0;
const openapi = require("@nestjs/swagger");
const user_role_enum_1 = require("./../user-role.enum");
const class_validator_1 = require("class-validator");
class UserCreateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 3, maxLength: 45 }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 3, maxLength: 250 }, active: { required: true, type: () => Number }, role: { required: true, enum: require("../user-role.enum").UserRole } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], UserCreateDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(250),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsIn([0, 1], {}),
    __metadata("design:type", Number)
], UserCreateDto.prototype, "active", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEnum(user_role_enum_1.UserRole, {}),
    __metadata("design:type", String)
], UserCreateDto.prototype, "role", void 0);
exports.UserCreateDto = UserCreateDto;
//# sourceMappingURL=user-create.dto.js.map