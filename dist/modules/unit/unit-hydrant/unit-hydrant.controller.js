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
const unit_hydrant_create_dto_1 = require("./dto/unit-hydrant-create.dto");
const unit_hydrant_update_dto_1 = require("./dto/unit-hydrant-update.dto");
const unit_hydrant_service_1 = require("./unit-hydrant.service");
let UnitHydrantController = class UnitHydrantController {
    constructor(_unitHydrantService) {
        this._unitHydrantService = _unitHydrantService;
    }
    findAll() {
        return this._unitHydrantService.findAll();
    }
    findOne(id) {
        return this._unitHydrantService.findOneById(id);
    }
    createOne(dto) {
        return this._unitHydrantService.createOne(dto);
    }
    updateOne(dto) {
        return this._unitHydrantService.updateOne(dto);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'id', type: String, required: true }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_hydrant_create_dto_1.UnitHydrantCreateDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "createOne", null);
__decorate([
    swagger_1.ApiBody({ type: unit_hydrant_update_dto_1.UnitHydrantUpdateDto }),
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_hydrant_update_dto_1.UnitHydrantUpdateDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "updateOne", null);
UnitHydrantController = __decorate([
    swagger_1.ApiTags('unit-hydrant'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('unit-hydrant'),
    __metadata("design:paramtypes", [unit_hydrant_service_1.UnitHydrantService])
], UnitHydrantController);
exports.UnitHydrantController = UnitHydrantController;
//# sourceMappingURL=unit-hydrant.controller.js.map