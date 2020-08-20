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
exports.StationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const station_dto_1 = require("./station.dto");
const station_service_1 = require("./station.service");
let StationController = class StationController {
    constructor(_statioService) {
        this._statioService = _statioService;
    }
    findAll(active) {
        return this._statioService.findAll(active);
    }
    findOne(id, active) {
        return this._statioService.findOne(id, active);
    }
    createOne(dto) {
        return this._statioService.createOne(dto);
    }
    updateOne(id, dto) {
        return this._statioService.updateOne(id, dto);
    }
    deleteOne(id) {
        return this._statioService.deleteOne(id);
    }
    activateOne(id) {
        return this._statioService.activateOne(id);
    }
};
__decorate([
    swagger_1.ApiQuery({ name: 'active', type: Number, required: false }),
    common_1.Get(),
    __param(0, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiQuery({ name: 'active', type: Number, required: false }),
    swagger_1.ApiParam({ name: 'id', type: Number, required: true }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [station_dto_1.StationDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "createOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, station_dto_1.StationDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "deleteOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "activateOne", null);
StationController = __decorate([
    swagger_1.ApiTags('station'),
    common_1.Controller('station'),
    __metadata("design:paramtypes", [station_service_1.StationService])
], StationController);
exports.StationController = StationController;
//# sourceMappingURL=station.controller.js.map