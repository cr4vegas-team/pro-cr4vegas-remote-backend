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
const openapi = require("@nestjs/swagger");
const unit_hydrant_gateway_1 = require("./unit-hydrant.gateway");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/auth/jwt-auth.guard");
const unit_exception_msg_enum_1 = require("../unit/unit-exception-msg.enum");
const unit_hydrant_create_dto_1 = require("./dto/unit-hydrant-create.dto");
const unit_hydrant_update_dto_1 = require("./dto/unit-hydrant-update.dto");
const unit_hydrant_exception_messages_1 = require("./unit-hydrant-exception-messages");
const unit_hydrant_service_1 = require("./unit-hydrant.service");
let UnitHydrantController = class UnitHydrantController {
    constructor(_unitHydrantService, _unitHydrantGateway) {
        this._unitHydrantService = _unitHydrantService;
        this._unitHydrantGateway = _unitHydrantGateway;
    }
    async getNotifications(message, context) {
        const mqttPacket = JSON.stringify({
            topic: context.getTopic(),
            message,
        });
        this._unitHydrantGateway.emit(mqttPacket);
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
    microservices_1.MessagePattern('n/u/h/+'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, microservices_1.Payload()),
    __param(1, microservices_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, microservices_1.MqttContext]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "getNotifications", null);
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-hydrant-response.dto").UnitsHydrantsRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-hydrant-response.dto").UnitHydrantRO }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/unit-hydrant-response.dto").UnitHydrantRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_hydrant_create_dto_1.UnitHydrantCreateDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "createOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiNotFoundResponse({
        description: unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND + ' | ' + unit_exception_msg_enum_1.UnitExceptionMSG.NOT_FOUND,
    }),
    swagger_1.ApiConflictResponse({ description: unit_exception_msg_enum_1.UnitExceptionMSG.CONFLICT }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: require("./dto/unit-hydrant-response.dto").UnitHydrantRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_hydrant_update_dto_1.UnitHydrantUpdateDto]),
    __metadata("design:returntype", Promise)
], UnitHydrantController.prototype, "updateOne", null);
UnitHydrantController = __decorate([
    swagger_1.ApiTags('unit-hydrant'),
    common_1.Controller('unit-hydrant'),
    __metadata("design:paramtypes", [unit_hydrant_service_1.UnitHydrantService,
        unit_hydrant_gateway_1.UnitHydrantGateway])
], UnitHydrantController);
exports.UnitHydrantController = UnitHydrantController;
//# sourceMappingURL=unit-hydrant.controller.js.map