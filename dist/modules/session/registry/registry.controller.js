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
exports.RegistryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const registry_service_1 = require("./registry.service");
let RegistryController = class RegistryController {
    constructor(_registryService) {
        this._registryService = _registryService;
    }
    findAll() {
        return this._registryService.findAll();
    }
    findAllBySessionId(sessionId) {
        console.log('asdf');
        return this._registryService.findAllBySessionId(sessionId);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: require("./dto/registry-response.dto").RegistriesRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':sessionId'),
    openapi.ApiResponse({ status: 200, type: require("./dto/registry-response.dto").RegistriesRO }),
    __param(0, common_1.Param('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegistryController.prototype, "findAllBySessionId", null);
RegistryController = __decorate([
    swagger_1.ApiTags('registry'),
    common_1.Controller('registry'),
    __metadata("design:paramtypes", [registry_service_1.RegistryService])
], RegistryController);
exports.RegistryController = RegistryController;
//# sourceMappingURL=registry.controller.js.map