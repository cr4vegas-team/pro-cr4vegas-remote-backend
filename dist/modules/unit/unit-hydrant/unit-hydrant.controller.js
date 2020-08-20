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
exports.UnitHydrantController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/auth/jwt-auth.guard");
const unit_hydrant_dto_1 = require("./unit-hydrant.dto");
const unit_hydrant_service_1 = require("./unit-hydrant.service");
let UnitHydrantController = class UnitHydrantController {
    constructor(_unitHydrantService) {
        this._unitHydrantService = _unitHydrantService;
    }
    findAll(active) {
        return this._unitHydrantService.findAll(active);
    }
    findOne(code, active) {
        return this._unitHydrantService.findOneByCode(code, active);
    }
    createOne(dto) {
        return this._unitHydrantService.createOne(dto);
    }
    updateOne(code, dto) {
        return this._unitHydrantService.updateOne(code, dto);
    }
    deleteOne(code) {
        return this._unitHydrantService.deleteOne(code);
    }
    activateOne(code) {
        return this._unitHydrantService.activateOne(code);
    }
};
__decorate([
    swagger_1.ApiQuery({ name: 'active', type: Boolean, required: false }),
    common_1.Get(),
    __param(0, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'code', type: String, required: true }),
    swagger_1.ApiQuery({ name: 'active', type: Boolean, required: false }),
    common_1.Get(':code'),
    __param(0, common_1.Param('code')), __param(1, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_hydrant_dto_1.UnitHydrantDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "createOne", null);
__decorate([
    common_1.Put(':code'),
    __param(0, common_1.Param('code')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, unit_hydrant_dto_1.UnitHydrantDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "deleteOne", null);
__decorate([
    common_1.Patch(':code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "activateOne", null);
UnitHydrantController = __decorate([
    swagger_1.ApiTags('unit-hydrant'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('unit-hydrant'),
    __metadata("design:paramtypes", [unit_hydrant_service_1.UnitHydrantService])
], UnitHydrantController);
exports.UnitHydrantController = UnitHydrantController;
//# sourceMappingURL=unit-hydrant.controller.js.map