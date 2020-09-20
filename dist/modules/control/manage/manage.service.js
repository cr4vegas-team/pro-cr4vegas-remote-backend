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
exports.ManageService = void 0;
const control_service_1 = require("./../control/control.service");
const class_transformer_1 = require("class-transformer");
const manage_entity_1 = require("./manage.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ManageService = class ManageService {
    constructor(_manageRepository, _controlService) {
        this._manageRepository = _manageRepository;
        this._controlService = _controlService;
    }
    async findAll() {
        const qb = this._manageRepository.createQueryBuilder('manages');
        const manages = await qb.getMany();
        const count = await qb.getCount();
        return { manages, count };
    }
    async findAllByControlId(controlId) {
        const qb = this._manageRepository.createQueryBuilder('manages')
            .leftJoinAndSelect('manages.controls', 'controls')
            .where('controls.id = :controlId', { controlId });
        const manages = await qb.getMany();
        const count = await qb.getCount();
        return { manages, count };
    }
    async insertOne(manageCreateDto) {
        const manageEntity = class_transformer_1.plainToClass(manage_entity_1.ManageEntity, manageCreateDto);
        const controlEntity = (await this._controlService.findOneById(manageCreateDto.control)).control;
        manageEntity.control = controlEntity;
        const savedManage = await this._manageRepository.save(manageEntity);
        return { manage: savedManage };
    }
};
ManageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(manage_entity_1.ManageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        control_service_1.ControlService])
], ManageService);
exports.ManageService = ManageService;
//# sourceMappingURL=manage.service.js.map