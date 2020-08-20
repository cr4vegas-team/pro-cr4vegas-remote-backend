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
exports.SetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const set_dto_1 = require("./set.dto");
const set_service_1 = require("./set.service");
let SetController = class SetController {
    constructor(_setService) {
        this._setService = _setService;
    }
    findAll(active) {
        return this._setService.findAll(active);
    }
    findOne(id, active) {
        return this._setService.findOne(id, active);
    }
    createOne(dto) {
        return this._setService.createOne(dto);
    }
    updateOne(id, dto) {
        return this._setService.updateOne(id, dto);
    }
    deleteOne(id) {
        return this._setService.deleteOne(id);
    }
    activateOne(id) {
        return this._setService.activateOne(id);
    }
};
__decorate([
    swagger_1.ApiQuery({ name: 'active', type: Number, required: false }),
    common_1.Get(),
    __param(0, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiQuery({ name: 'active', type: Number, required: false }),
    swagger_1.ApiParam({ name: 'id', type: Number, required: true }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_dto_1.SetDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "createOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, set_dto_1.SetDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "activateOne", null);
SetController = __decorate([
    swagger_1.ApiTags('set'),
    common_1.Controller('set'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
exports.SetController = SetController;
//# sourceMappingURL=set.controller.js.map