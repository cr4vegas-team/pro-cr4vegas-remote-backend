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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SectorUpdateDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], SectorUpdateDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], SectorUpdateDto.prototype, "description", void 0);
exports.SectorUpdateDto = SectorUpdateDto;
//# sourceMappingURL=sector-update.dto.js.map