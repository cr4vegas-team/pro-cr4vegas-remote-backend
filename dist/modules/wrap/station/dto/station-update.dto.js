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
exports.StationUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class StationUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, code: { required: true, type: () => String, minLength: 1, maxLength: 5 }, name: { required: true, type: () => String, minLength: 3, maxLength: 45 }, description: { required: true, type: () => String }, altitude: { required: true, type: () => Number }, latitude: { required: true, type: () => Number }, longitude: { required: true, type: () => Number }, active: { required: true, type: () => Number }, units: { required: false, type: () => [Number] }, image: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationUpdateDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(5),
    __metadata("design:type", String)
], StationUpdateDto.prototype, "code", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(45),
    __metadata("design:type", String)
], StationUpdateDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], StationUpdateDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationUpdateDto.prototype, "altitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationUpdateDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StationUpdateDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsIn([0, 1]),
    __metadata("design:type", Number)
], StationUpdateDto.prototype, "active", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber({}, { each: true }),
    __metadata("design:type", Array)
], StationUpdateDto.prototype, "units", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], StationUpdateDto.prototype, "image", void 0);
exports.StationUpdateDto = StationUpdateDto;
//# sourceMappingURL=station-update.dto.js.map