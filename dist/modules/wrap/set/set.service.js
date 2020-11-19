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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const unit_service_1 = require("../../unit/unit/unit.service");
const set_exception_msg_1 = require("./set-exception.msg");
const set_type_entity_1 = require("./set-type.entity");
const set_entity_1 = require("./set.entity");
let SetService = class SetService {
    constructor(_setRepository, _setTypeRepository, _unitService) {
        this._setRepository = _setRepository;
        this._setTypeRepository = _setTypeRepository;
        this._unitService = _unitService;
    }
    async findAll() {
        const qb = await this._setRepository
            .createQueryBuilder('sets')
            .leftJoinAndSelect('sets.units', 'units')
            .leftJoinAndSelect('sets.setType', 'setType')
            .orderBy('sets.created', 'DESC');
        const setsCount = await qb.getCount();
        const foundSets = await qb.getMany();
        return { sets: foundSets, count: setsCount };
    }
    async findAllByIds(ids) {
        const qb = await this._setRepository
            .createQueryBuilder('sets')
            .leftJoinAndSelect('sets.setType', 'setType')
            .whereInIds(ids);
        const sets = await qb.getMany();
        const count = await qb.getCount();
        return { sets, count };
    }
    async findOne(id) {
        const qb = await this._setRepository
            .createQueryBuilder('sets')
            .leftJoinAndSelect('sets.setType', 'setType')
            .where('sets.id = :id', { id });
        const foundSet = await qb.getOne();
        return { set: foundSet };
    }
    async findOneWithUnits(id) {
        const qb = await this._setRepository
            .createQueryBuilder('sets')
            .leftJoinAndSelect('sets.units', 'units')
            .leftJoinAndSelect('sets.setType', 'setType')
            .where('sets.id = :id', { id });
        const foundSet = await qb.getOne();
        return { set: foundSet };
    }
    async createOne(dto) {
        const foundSet = await this._setRepository
            .createQueryBuilder('sets')
            .where('sets.code = :code', { code: dto.code })
            .orWhere('sets.name = :name', { name: dto.name })
            .getOne();
        if (foundSet) {
            if (foundSet.name === dto.name) {
                throw new common_1.ConflictException(set_exception_msg_1.SetExceptionMSG.CONFLICT_NAME);
            }
            throw new common_1.ConflictException(set_exception_msg_1.SetExceptionMSG.CONFLICT_CODE);
        }
        const newSet = class_transformer_1.plainToClass(set_entity_1.SetEntity, dto);
        newSet.units = (await this._unitService.findAllByIds(dto.units)).units;
        newSet.setType = await this._setTypeRepository.findOne({
            where: { name: dto.setType },
        });
        const savedStation = await this._setRepository.save(newSet);
        console.log(savedStation);
        return { set: savedStation };
    }
    async updateOne(dto) {
        const foundSetConflict = await this._setRepository
            .createQueryBuilder('sets')
            .where('sets.code = :code', { code: dto.code })
            .orWhere('sets.name = :name', { name: dto.name })
            .getOne();
        if (foundSetConflict && foundSetConflict.id !== dto.id) {
            if (foundSetConflict.name === dto.name) {
                throw new common_1.ConflictException(set_exception_msg_1.SetExceptionMSG.CONFLICT_NAME);
            }
            throw new common_1.ConflictException(set_exception_msg_1.SetExceptionMSG.CONFLICT_CODE);
        }
        let foundSet = await this._setRepository
            .createQueryBuilder('sets')
            .where('sets.id = :id', { id: dto.id })
            .getOne();
        if (!foundSet) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND);
        }
        foundSet = class_transformer_1.plainToClass(set_entity_1.SetEntity, dto);
        foundSet.units = (await this._unitService.findAllByIds(dto.units)).units;
        foundSet.setType = await this._setTypeRepository.findOne({
            where: { name: dto.setType },
        });
        const updatedSet = await this._setRepository.save(foundSet);
        return { set: updatedSet };
    }
    async findAllSetTypes() {
        const foundSetsTypes = await this._setTypeRepository
            .createQueryBuilder('sets_types')
            .getMany();
        return foundSetsTypes;
    }
    async insertSetType(setType) {
        const foundSetType = await this._setTypeRepository
            .createQueryBuilder('sets_types')
            .where('sets_types.name = :name', { name: setType.name })
            .getOne();
        if (foundSetType) {
            throw new common_1.ConflictException(set_exception_msg_1.SetExceptionMSG.CONFLICT_TYPE);
        }
        return await this._setTypeRepository.save(setType);
    }
    async updateSetType(dto) {
        const foundSetType = await this._setTypeRepository
            .createQueryBuilder('sets_types')
            .where('sets_types.name = :name', { name: dto.oldName })
            .getOne();
        if (!foundSetType) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND_TYPE);
        }
        foundSetType.name = dto.newName;
        return await this._setTypeRepository.save(foundSetType);
    }
    async deleteSetType(name) {
        console.log('setType: ' + name);
        const foundSetType = await this._setTypeRepository
            .createQueryBuilder('sets_types')
            .where('sets_types.name = :name', { name })
            .getOne();
        if (!foundSetType) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND_TYPE);
        }
        const foundSet = await this._setRepository
            .createQueryBuilder('sets')
            .where('sets.setType = :name', { name })
            .getOne();
        if (foundSet) {
            throw new common_1.BadRequestException(set_exception_msg_1.SetExceptionMSG.SET_TYPE_LINKED);
        }
        return (await this._setTypeRepository.delete(name)).affected > 0;
    }
};
SetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(set_entity_1.SetEntity)),
    __param(1, typeorm_1.InjectRepository(set_type_entity_1.SetTypeEntity)),
    __param(2, common_1.Inject(common_1.forwardRef(() => unit_service_1.UnitService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        unit_service_1.UnitService])
], SetService);
exports.SetService = SetService;
//# sourceMappingURL=set.service.js.map