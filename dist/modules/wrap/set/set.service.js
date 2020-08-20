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
const typeorm_2 = require("typeorm");
const set_exception_msg_1 = require("./set-exception.msg");
const set_entity_1 = require("./set.entity");
let SetService = class SetService {
    constructor(_setRepository) {
        this._setRepository = _setRepository;
    }
    async findAll(active) {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.leftJoinAndSelect("sets.units", "units");
        qb.leftJoinAndSelect('sets.setType', 'setType');
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("sets.active = :active", { active });
        }
        const setsCount = await qb.getCount();
        qb.orderBy("sets.created", "DESC");
        const foundStations = await qb.getMany();
        return { sets: foundStations, count: setsCount };
    }
    async findOne(id, active) {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.leftJoinAndSelect("sets.units", "units");
        qb.leftJoinAndSelect('sets.setType', 'setType');
        qb.where("sets.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("sets.active = :active", { active });
        }
        const foundSet = await qb.getOne();
        return { set: foundSet };
    }
    async createOne(dto) {
        const newStation = new set_entity_1.SetEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        const savedStation = await this._setRepository.save(newStation);
        return { set: savedStation };
    }
    async updateOne(id, dto) {
        const foundSet = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND_ID);
        }
        foundSet.code = dto.code;
        foundSet.name = dto.name;
        foundSet.description = dto.description;
        const updatedStation = await this._setRepository.save(foundSet);
        return updatedStation ? true : false;
    }
    async deleteOne(id) {
        const foundSet = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND_ID);
        }
        const updatedStation = await this._setRepository.update(id, { active: false });
        return updatedStation.affected > 0;
    }
    async activateOne(id) {
        const foundSet = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new common_1.NotFoundException(set_exception_msg_1.SetExceptionMSG.NOT_FOUND_ID);
        }
        const updatedUnit = await this._setRepository.update(id, { active: true });
        return updatedUnit.affected > 0;
    }
};
SetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(set_entity_1.SetEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SetService);
exports.SetService = SetService;
//# sourceMappingURL=set.service.js.map