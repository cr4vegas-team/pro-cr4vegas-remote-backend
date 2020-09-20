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
exports.UnitGenericController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unit_hydrant_update_dto_1 = require("../unit-hydrant/dto/unit-hydrant-update.dto");
const unit_generic_create_dto_1 = require("./dto/unit-generic-create.dto");
const unit_generic_update_dto_1 = require("./dto/unit-generic-update.dto");
const unit_generic_service_1 = require("./unit-generic.service");
let UnitGenericController = class UnitGenericController {
    constructor(_unitGenericService) {
        this._unitGenericService = _unitGenericService;
    }
    findAll() {
        return this._unitGenericService.findAll();
    }
    findOne(id) {
        return this._unitGenericService.findOneById(id);
    }
    createOne(dto) {
        return this._unitGenericService.create(dto);
    }
    updateOne(dto) {
        return this._unitGenericService.update(dto);
    }
};
__decorate([
    swagger_1.ApiResponse({}),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitGenericController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'id', type: String, required: true }),
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitGenericController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_generic_create_dto_1.UnitGenericCreateDto]),
    __metadata("design:returntype", Promise)
], UnitGenericController.prototype, "createOne", null);
__decorate([
    swagger_1.ApiBody({ type: unit_hydrant_update_dto_1.UnitHydrantUpdateDto }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_generic_update_dto_1.UnitGenericUpdateDto]),
    __metadata("design:returntype", Promise)
], UnitGenericController.prototype, "updateOne", null);
UnitGenericController = __decorate([
    swagger_1.ApiTags('unit-generic'),
    common_1.Controller('unit-generic'),
    __metadata("design:paramtypes", [unit_generic_service_1.UnitGenericService])
], UnitGenericController);
exports.UnitGenericController = UnitGenericController;
//# sourceMappingURL=unit-generic.controller.js.map