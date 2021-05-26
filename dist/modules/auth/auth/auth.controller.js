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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_create_dto_1 = require("../user/dto/user-create.dto");
const user_exception_msg_1 = require("../user/user-exception.msg");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const local_auth_guard_1 = require("./local-auth.guard");
let AuthController = class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    async validate(req) {
        return req.user;
    }
    async login(req) {
        return this._authService.getToken(req.user);
    }
    async signin(dto) {
        return await this._authService.signin(dto);
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('user'),
    openapi.ApiResponse({ status: 200, type: require("../user/dto/user-response.dto").UserDto }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validate", null);
__decorate([
    swagger_1.ApiQuery({
        name: 'username',
        type: String,
        description: 'Username or Email',
    }),
    swagger_1.ApiQuery({ name: 'password', type: String }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('login'),
    openapi.ApiResponse({ status: 201, type: require("./dto/auth-response.dto").TokenRO }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: user_exception_msg_1.UserExceptionMSG.NOT_FOUND }),
    swagger_1.ApiConflictResponse({
        description: user_exception_msg_1.UserExceptionMSG.CONFLICT_EMAIL +
            ' | ' +
            user_exception_msg_1.UserExceptionMSG.CONFLICT_USERNAME,
    }),
    swagger_1.ApiBadRequestResponse({ description: user_exception_msg_1.UserExceptionMSG.BAD_REQUEST }),
    common_1.Post('signin'),
    openapi.ApiResponse({ status: 201, type: require("../user/dto/user-response.dto").UserRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
AuthController = __decorate([
    swagger_1.ApiTags('auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map