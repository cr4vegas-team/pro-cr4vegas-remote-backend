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
exports.UnitCreateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const unit_type_enum_1 = require("../unit-type.enum");
class UnitCreateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { code: { required: true, type: () => Number }, unitTypeTable: { required: true, enum: require("../unit-type.enum").UnitTypeTableEnum }, station: { required: false, type: () => Number }, sector: { required: true, type: () => Number }, sets: { required: false, type: () => [Number] }, altitude: { required: true, type: () => Number }, latitude: { required: true, type: () => Number, minimum: -90, maximum: 90 }, longitude: { required: true, type: () => Number, minimum: -90, maximum: 90 }, description: { required: false, type: () => String }, active: { required: true, type: () => Number }, image: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEnum(unit_type_enum_1.UnitTypeTableEnum, {}),
    __metadata("design:type", String)
], UnitCreateDto.prototype, "unitTypeTable", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "station", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "sector", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber({}, { each: true }),
    __metadata("design:type", Array)
], UnitCreateDto.prototype, "sets", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "altitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(-90),
    class_validator_1.Max(90),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(-90),
    class_validator_1.Max(90),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UnitCreateDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsIn([0, 1]),
    __metadata("design:type", Number)
], UnitCreateDto.prototype, "active", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UnitCreateDto.prototype, "image", void 0);
exports.UnitCreateDto = UnitCreateDto;
//# sourceMappingURL=unit-create.dto.js.map