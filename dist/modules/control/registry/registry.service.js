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
exports.RegistryService = void 0;
const class_transformer_1 = require("class-transformer");
const control_service_1 = require("./../control/control.service");
const registry_entity_1 = require("./registry.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RegistryService = class RegistryService {
    constructor(_registryRepository, _controlService) {
        this._registryRepository = _registryRepository;
        this._controlService = _controlService;
    }
    async findAll() {
        const qb = this._registryRepository.createQueryBuilder('registries');
        const registries = await qb.getMany();
        const count = await qb.getCount();
        return { registries, count };
    }
    async findAllByControlId(controlId) {
        const qb = this._registryRepository.createQueryBuilder('registries')
            .leftJoinAndSelect('registries.control', 'control')
            .where('control.id = :id', { id: controlId });
        const registries = await qb.getMany();
        const count = await qb.getCount();
        return { registries, count };
    }
    async insertOne(registryCreateDto) {
        const registryEntity = class_transformer_1.plainToClass(registry_entity_1.RegistryEntity, registryCreateDto);
        const foundControl = (await this._controlService.findOneById(registryCreateDto.control)).control;
        registryEntity.control = foundControl;
        const savedRegistry = await this._registryRepository.save(registryEntity);
        return { registry: savedRegistry };
    }
};
RegistryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(registry_entity_1.RegistryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        control_service_1.ControlService])
], RegistryService);
exports.RegistryService = RegistryService;
//# sourceMappingURL=registry.service.js.map