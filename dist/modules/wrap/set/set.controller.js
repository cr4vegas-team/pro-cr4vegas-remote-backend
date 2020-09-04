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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const set_create_dto_1 = require("./dto/set-create.dto");
const set_update_dto_1 = require("./dto/set-update.dto");
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
        return this._setService.findOneById(id);
    }
    createOne(dto) {
        return this._setService.createOne(dto);
    }
    updateOne(dto) {
        return this._setService.updateOne(dto);
    }
    deleteOne(id) {
        return this._setService.deleteOne(id);
    }
    activateOne(id) {
        return this._setService.activateOne(id);
    }
    insertSetType(dto) {
        return this._setService.insertSetType(dto);
    }
    deleteSetType(name) {
        return this._setService.deleteSetType(name);
    }
    updateSetType(oldName, newName) {
        return this._setService.updateSetType(oldName, newName);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'id', type: Number, required: true }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_create_dto_1.SetCreateDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "createOne", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_update_dto_1.SetUpdateDto]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateOne", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "activateOne", null);
__decorate([
    common_1.Post('set-type'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_type_entity_1.SetTypeEntity]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "insertSetType", null);
__decorate([
    common_1.Delete('set-type/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteSetType", null);
__decorate([
    common_1.Put('set-type/:name'),
    __param(0, common_1.Param('name')), __param(1, common_1.Query('newName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateSetType", null);
SetController = __decorate([
    swagger_1.ApiTags('set'),
    common_1.Controller('set'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
exports.SetController = SetController;
//# sourceMappingURL=set.controller.js.map