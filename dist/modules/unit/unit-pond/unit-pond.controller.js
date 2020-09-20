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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitPondController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unit_pond_create_dto_1 = require("./dto/unit-pond-create.dto");
const unit_pond_update_dto_1 = require("./dto/unit-pond-update.dto");
const unit_pond_service_1 = require("./unit-pond.service");
let UnitPondController = class UnitPondController {
    constructor(_unitPondService) {
        this._unitPondService = _unitPondService;
    }
    findAll() {
        return this._unitPondService.findAll();
    }
    findOne(id) {
        return this._unitPondService.findOneById(id);
    }
    createOne(dto) {
        console.log(dto);
        return this._unitPondService.createOne(dto);
    }
    updateOne(dto) {
        return this._unitPondService.updateOne(dto);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'id', type: String, required: true }),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_pond_create_dto_1.UnitPondCreateDto]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "createOne", null);
__decorate([
    swagger_1.ApiBody({ type: unit_pond_update_dto_1.UnitPondUpdateDto }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_pond_update_dto_1.UnitPondUpdateDto]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "updateOne", null);
UnitPondController = __decorate([
    swagger_1.ApiTags('unit-pond'),
    common_1.Controller('unit-pond'),
    __metadata("design:paramtypes", [unit_pond_service_1.UnitPondService])
], UnitPondController);
exports.UnitPondController = UnitPondController;
//# sourceMappingURL=unit-pond.controller.js.map