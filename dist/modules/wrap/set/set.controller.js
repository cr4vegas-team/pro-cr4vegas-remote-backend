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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const set_create_dto_1 = require("./dto/set-create.dto");
const set_type_update_dto_1 = require("./dto/set-type-update.dto");
const set_update_dto_1 = require("./dto/set-update.dto");
const set_exception_msg_1 = require("./set-exception.msg");
const set_type_entity_1 = require("./set-type.entity");
const set_service_1 = require("./set.service");
let SetController = class SetController {
    constructor(_setService) {
        this._setService = _setService;
    }
    findAll() {
        return this._setService.findAll();
    }
    findOne(id) {
        return this._setService.findOneWithUnits(id);
    }
    createOne(dto) {
        return this._setService.createOne(dto);
    }
    updateOne(dto) {
        return this._setService.updateOne(dto);
    }
    findAllSetTypes() {
        return this._setService.findAllSetTypes();
    }
    insertSetType(dto) {
        return this._setService.insertSetType(dto);
    }
    deleteSetType(name) {
        return this._setService.deleteSetType(name);
    }
    updateSetType(dto) {
        return this._setService.updateSetType(dto);
    }
};
__decorate([
    common_1.Get('all'),
    openapi.ApiResponse({ status: 200, type: require("./dto/set-response.dto").SetsRO }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findAll", null);
__decorate([
    common_1.Get('one/:id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/set-response.dto").SetRO }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiConflictResponse({
        description: set_exception_msg_1.SetExceptionMSG.CONFLICT_CODE + '  | ' + set_exception_msg_1.SetExceptionMSG.CONFLICT_NAME,
    }),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./dto/set-response.dto").SetRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_create_dto_1.SetCreateDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "createOne", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: set_exception_msg_1.SetExceptionMSG.NOT_FOUND }),
    swagger_1.ApiConflictResponse({
        description: set_exception_msg_1.SetExceptionMSG.CONFLICT_CODE + '  | ' + set_exception_msg_1.SetExceptionMSG.CONFLICT_NAME,
    }),
    common_1.Put(),
    openapi.ApiResponse({ status: 200, type: require("./dto/set-response.dto").SetRO }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_update_dto_1.SetUpdateDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateOne", null);
__decorate([
    common_1.Get('set-type'),
    openapi.ApiResponse({ status: 200, type: [require("./set-type.entity").SetTypeEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findAllSetTypes", null);
__decorate([
    swagger_1.ApiConflictResponse({ description: set_exception_msg_1.SetExceptionMSG.CONFLICT_TYPE }),
    common_1.Post('set-type'),
    openapi.ApiResponse({ status: 201, type: require("./set-type.entity").SetTypeEntity }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_type_entity_1.SetTypeEntity]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "insertSetType", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: set_exception_msg_1.SetExceptionMSG.NOT_FOUND_TYPE }),
    common_1.Delete('set-type/:name'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteSetType", null);
__decorate([
    swagger_1.ApiNotFoundResponse({ description: set_exception_msg_1.SetExceptionMSG.NOT_FOUND_TYPE }),
    swagger_1.ApiBadRequestResponse({ description: set_exception_msg_1.SetExceptionMSG.SET_TYPE_LINKED }),
    common_1.Put('set-type'),
    openapi.ApiResponse({ status: 200, type: require("./set-type.entity").SetTypeEntity }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_type_update_dto_1.SetTypeUpdateDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateSetType", null);
SetController = __decorate([
    swagger_1.ApiTags('set'),
    common_1.Controller('set'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
exports.SetController = SetController;
//# sourceMappingURL=set.controller.js.map