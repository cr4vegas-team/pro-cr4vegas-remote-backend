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
exports.UnitPondUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unit_update_dto_1 = require("../../unit/dto/unit-update.dto");
class UnitPondUpdateDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitPondUpdateDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", unit_update_dto_1.UnitUpdateDto)
], UnitPondUpdateDto.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UnitPondUpdateDto.prototype, "code", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitPondUpdateDto.prototype, "m3", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitPondUpdateDto.prototype, "height", void 0);
exports.UnitPondUpdateDto = UnitPondUpdateDto;
//# sourceMappingURL=unit-pond-update.dto.js.map