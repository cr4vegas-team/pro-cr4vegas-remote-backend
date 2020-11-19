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
exports.ActionController = void 0;
const openapi = require("@nestjs/swagger");
const action_create_dto_1 = require("./dto/action-create.dto");
const action_service_1 = require("./action.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ActionController = class ActionController {
    constructor(_actionService) {
        this._actionService = _actionService;
    }
    findAll() {
        return this._actionService.findAll();
    }
    findAllBySessionId(sessionId) {
        return this._actionService.findAllBySessionId(sessionId);
    }
    insertOne(manageCreateDto) {
        return this._actionService.insertOne(manageCreateDto);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/action-response.dto").ActionsRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "findAll", null);
__decorate([
    common_1.Get(':sessionId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/action-response.dto").ActionsRO }),
    __param(0, common_1.Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "findAllBySessionId", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/action-response.dto").ActionRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [action_create_dto_1.ActionCreateDto]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "insertOne", null);
ActionController = __decorate([
    swagger_1.ApiTags('action'),
    common_1.Controller('action'),
    __metadata("design:paramtypes", [action_service_1.ActionService])
], ActionController);
exports.ActionController = ActionController;
//# sourceMappingURL=action.controller.js.map