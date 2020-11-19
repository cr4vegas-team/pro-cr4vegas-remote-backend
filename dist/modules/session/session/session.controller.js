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
exports.SessionController = void 0;
const openapi = require("@nestjs/swagger");
const session_exception_msg_1 = require("./session-exception.msg");
const session_create_dto_1 = require("./dto/session-create.dto");
const session_service_1 = require("./session.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let SessionController = class SessionController {
    constructor(_controlService) {
        this._controlService = _controlService;
    }
    findAll() {
        return this._controlService.findAll();
    }
    findAllByUserId(userId) {
        return this._controlService.findAllByUserId(userId);
    }
    insertOne(dto) {
        return this._controlService.startSession(dto);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "findAll", null);
__decorate([
    common_1.Get(':userId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "findAllByUserId", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: session_exception_msg_1.SessionExceptionMSG.NOT_FOUND }),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_create_dto_1.SessionCreateDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "insertOne", null);
SessionController = __decorate([
    swagger_1.ApiTags('control'),
    common_1.Controller('control'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map