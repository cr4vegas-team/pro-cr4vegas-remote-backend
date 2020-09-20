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
exports.ManageController = void 0;
const openapi = require("@nestjs/swagger");
const manage_create_dto_1 = require("./manage-create.dto");
const manage_service_1 = require("./manage.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ManageController = class ManageController {
    constructor(_manageService) {
        this._manageService = _manageService;
    }
    findAll() {
        return this._manageService.findAll();
    }
    findAllByControlId(controlId) {
        return this._manageService.findAllByControlId(controlId);
    }
    insertOne(manageCreateDto) {
        return this._manageService.insertOne(manageCreateDto);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManageController.prototype, "findAll", null);
__decorate([
    common_1.Get(':controlId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('controlId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ManageController.prototype, "findAllByControlId", null);
__decorate([
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_create_dto_1.ManageCreateDto]),
    __metadata("design:returntype", Promise)
], ManageController.prototype, "insertOne", null);
ManageController = __decorate([
    swagger_1.ApiTags('manage'),
    common_1.Controller('manage'),
    __metadata("design:paramtypes", [manage_service_1.ManageService])
], ManageController);
exports.ManageController = ManageController;
//# sourceMappingURL=manage.controller.js.map