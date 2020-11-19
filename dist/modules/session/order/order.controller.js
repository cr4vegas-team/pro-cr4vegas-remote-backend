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
exports.OrderController = void 0;
const openapi = require("@nestjs/swagger");
const order_exception_msg_1 = require("./order-exception.msg");
const order_update_dto_1 = require("./dto/order-update.dto");
const order_create_dto_1 = require("./dto/order-create.dto");
const order_service_1 = require("./order.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(_orderService) {
        this._orderService = _orderService;
    }
    findAll() {
        return this._orderService.findAll();
    }
    findAllBySessionId(sessionId) {
        return this._orderService.findAllByControlid(sessionId);
    }
    insertOne(orderCreateDto) {
        return this._orderService.insertOne(orderCreateDto);
    }
    updateOne(orderUpdateDto) {
        return this._orderService.updateOne(orderUpdateDto);
    }
    activate(id) {
        return this._orderService.activate(id);
    }
    deactivate(id) {
        return this._orderService.deactivate(id);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/order-response.dto").OrdersRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    common_1.Get(':sessionId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/order-response.dto").OrdersRO }),
    __param(0, common_1.Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllBySessionId", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/order-response.dto").OrderRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_dto_1.OrderCreateDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "insertOne", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: order_exception_msg_1.OrderExceptionMSG.NOT_FOUND }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: require("./dto/order-response.dto").OrderRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_update_dto_1.OrderUpdateDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOne", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: order_exception_msg_1.OrderExceptionMSG.NOT_FOUND }),
    common_1.Patch(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "activate", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: order_exception_msg_1.OrderExceptionMSG.NOT_FOUND }),
    common_1.Delete(':id'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deactivate", null);
OrderController = __decorate([
    swagger_1.ApiTags('order'),
    common_1.Controller('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map