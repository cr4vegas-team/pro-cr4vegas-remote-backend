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
exports.UnitUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const unit_type_enum_1 = require("./../unit-type.enum");
const class_validator_1 = require("class-validator");
class UnitUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, code: { required: true, type: () => Number }, unitTypeTable: { required: true, enum: require("../unit-type.enum").UnitTypeTableEnum }, station: { required: false, type: () => Number }, sector: { required: false, type: () => Number }, sets: { required: false, type: () => [Number] }, altitude: { required: true, type: () => Number }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, description: { required: false, type: () => String }, image: { required: true, type: () => String }, active: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEnum(unit_type_enum_1.UnitTypeTableEnum, {}),
    __metadata("design:type", String)
], UnitUpdateDto.prototype, "unitTypeTable", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "station", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "sector", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber({}, { each: true }),
    __metadata("design:type", Array)
], UnitUpdateDto.prototype, "sets", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "altitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UnitUpdateDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UnitUpdateDto.prototype, "image", void 0);
__decorate([
    class_validator_1.IsIn([0, 1]),
    __metadata("design:type", Number)
], UnitUpdateDto.prototype, "active", void 0);
exports.UnitUpdateDto = UnitUpdateDto;
//# sourceMappingURL=unit-update.dto.js.map