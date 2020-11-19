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
exports.UnitHydrantUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unit_update_dto_1 = require("../../unit/dto/unit-update.dto");
class UnitHydrantUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, unit: { required: true, type: () => require("../../unit/dto/unit-update.dto").UnitUpdateDto }, diameter: { required: false, type: () => Number }, filter: { required: false, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitHydrantUpdateDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", unit_update_dto_1.UnitUpdateDto)
], UnitHydrantUpdateDto.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UnitHydrantUpdateDto.prototype, "diameter", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsIn([0, 1]),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UnitHydrantUpdateDto.prototype, "filter", void 0);
exports.UnitHydrantUpdateDto = UnitHydrantUpdateDto;
//# sourceMappingURL=unit-hydrant-update.dto.js.map