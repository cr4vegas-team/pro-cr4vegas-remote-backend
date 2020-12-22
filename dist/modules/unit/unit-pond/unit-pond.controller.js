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
const unit_pond_gateway_1 = require("./unit-pond.gateway");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unit_exception_msg_enum_1 = require("../unit/unit-exception-msg.enum");
const unit_pond_create_dto_1 = require("./dto/unit-pond-create.dto");
const unit_pond_update_dto_1 = require("./dto/unit-pond-update.dto");
const unit_pond_exception_messages_1 = require("./unit-pond-exception-messages");
const unit_pond_service_1 = require("./unit-pond.service");
const microservices_1 = require("@nestjs/microservices");
let UnitPondController = class UnitPondController {
    constructor(_unitPondService, _unitPondGateway) {
        this._unitPondService = _unitPondService;
        this._unitPondGateway = _unitPondGateway;
    }
    async getNotifications(message, context) {
        const mqttPacket = JSON.stringify({
            topic: context.getTopic(),
            message,
        });
        this._unitPondGateway.emit(mqttPacket);
    }
    findAll() {
        return this._unitPondService.findAll();
    }
    findOne(id) {
        return this._unitPondService.findOneById(id);
    }
    createOne(dto) {
        return this._unitPondService.createOne(dto);
    }
    updateOne(dto) {
        return this._unitPondService.updateOne(dto);
    }
};
__decorate([
    microservices_1.MessagePattern('n/u/p/+'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, microservices_1.Payload()),
    __param(1, microservices_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, microservices_1.MqttContext]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "getNotifications", null);
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-pond-response.dto").UnitsPondsRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-pond-response.dto").UnitPondRO }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiConflictResponse({ description: unit_exception_msg_enum_1.UnitExceptionMSG.CONFLICT }),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/unit-pond-response.dto").UnitPondRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_pond_create_dto_1.UnitPondCreateDto]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "createOne", null);
__decorate([
    swagger_1.ApiNotFoundResponse({
        description: unit_pond_exception_messages_1.UnitPondExceptionMSG.NOT_FOUND + ' | ' + unit_exception_msg_enum_1.UnitExceptionMSG.NOT_FOUND,
    }),
    swagger_1.ApiConflictResponse({ description: unit_exception_msg_enum_1.UnitExceptionMSG.CONFLICT }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-pond-response.dto").UnitPondRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_pond_update_dto_1.UnitPondUpdateDto]),
    __metadata("design:returntype", Promise)
], UnitPondController.prototype, "updateOne", null);
UnitPondController = __decorate([
    swagger_1.ApiTags('unit-pond'),
    common_1.Controller('unit-pond'),
    __metadata("design:paramtypes", [unit_pond_service_1.UnitPondService,
        unit_pond_gateway_1.UnitPondGateway])
], UnitPondController);
exports.UnitPondController = UnitPondController;
//# sourceMappingURL=unit-pond.controller.js.map