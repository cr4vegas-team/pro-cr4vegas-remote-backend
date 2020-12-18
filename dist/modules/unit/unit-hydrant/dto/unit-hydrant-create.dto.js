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
exports.UnitHydrantCreateDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unit_create_dto_1 = require("../../unit/dto/unit-create.dto");
class UnitHydrantCreateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { unit: { required: true, type: () => require("../../unit/dto/unit-create.dto").UnitCreateDto }, initBatch: { required: false, type: () => Number }, diameter: { required: false, type: () => Number }, filter: { required: false, type: () => Number } };
    }
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", unit_create_dto_1.UnitCreateDto)
], UnitHydrantCreateDto.prototype, "unit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UnitHydrantCreateDto.prototype, "initBatch", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UnitHydrantCreateDto.prototype, "diameter", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsIn([0, 1]),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UnitHydrantCreateDto.prototype, "filter", void 0);
exports.UnitHydrantCreateDto = UnitHydrantCreateDto;
//# sourceMappingURL=unit-hydrant-create.dto.js.map