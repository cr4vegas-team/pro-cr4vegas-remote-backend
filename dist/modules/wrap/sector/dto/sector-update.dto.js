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
exports.SectorUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SectorUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, code: { required: true, type: () => String, minLength: 1, maxLength: 5 }, units: { required: false, type: () => [Number] }, name: { required: true, type: () => String, minLength: 3, maxLength: 45 }, description: { required: false, type: () => String }, active: { required: true, type: () => Number }, image: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], SectorUpdateDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(5),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], SectorUpdateDto.prototype, "units", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsIn([0, 1]),
    __metadata("design:type", Number)
], SectorUpdateDto.prototype, "active", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "image", void 0);
exports.SectorUpdateDto = SectorUpdateDto;
//# sourceMappingURL=sector-update.dto.js.map