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
exports.UnitHydrantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const units_hydrants_1 = require("../../../database/static_data/units-hydrants");
const typeorm_2 = require("typeorm");
const unit_types_constant_1 = require("../unit/unit-types.constant");
const unit_service_1 = require("../unit/unit.service");
const unit_hydrant_exception_messages_1 = require("./unit-hydrant-exception-messages");
const unit_hydrant_entity_1 = require("./unit-hydrant.entity");
let UnitHydrantService = class UnitHydrantService {
    constructor(_unitHydrantRepository, _unitService) {
        this._unitHydrantRepository = _unitHydrantRepository;
        this._unitService = _unitService;
        units_hydrants_1.UNITS_HYDRANTS_TEST.forEach(unitHydrant => {
            this.createOne(unitHydrant);
        });
    }
    async findAll(active) {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector');
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("unit.active = :active", { active });
        }
        const unitsHydrantsCount = await qb.getCount();
        qb.orderBy("unit.created", "DESC");
        const foundUnitsHydrants = await qb.getMany();
        return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
    }
    async findOneByCode(code, active) {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit');
        qb.where("units_hydrants.code = :code", { code });
        if (!isNaN(active)) {
            qb.andWhere("unit.active = :active", { active });
        }
        const foundUnitHydrant = await qb.getOne();
        return { unitHydrant: foundUnitHydrant };
    }
    async createOne(dto) {
        const foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.code = :code', { code: dto.unit.code }).getOne();
        if (foundUnitHydrant) {
            throw new common_1.ConflictException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.CONFLICT);
        }
        const newUnit = (await this._unitService.createOne(dto.unit, unit_types_constant_1.UnitType.HYDRANT)).unit;
        const newUnitHydrant = new unit_hydrant_entity_1.UnitHydrantEntity();
        newUnitHydrant.unit = newUnit;
        newUnitHydrant.code = dto.unit.code;
        newUnitHydrant.diameter = dto.diameter;
        newUnitHydrant.filter = dto.filter;
        const savedUnitHydrant = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }
    async updateOne(code, dto) {
        const foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new common_1.NotFoundException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND);
        }
        const updatedUnit = await this._unitService.updateOne(foundUnitHydrant.unit.id, dto.unit);
        foundUnitHydrant.code = dto.code;
        foundUnitHydrant.diameter = dto.diameter;
        foundUnitHydrant.filter = dto.filter;
        const updateUnitHydrant = await this._unitHydrantRepository.update({ code }, foundUnitHydrant);
        return updateUnitHydrant.affected > 0 && updatedUnit;
    }
    async deleteOne(code) {
        const foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new common_1.NotFoundException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return await this._unitService.deleteOne(foundUnitHydrant.unit.id);
    }
    async activateOne(code) {
        console.log(code);
        const foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new common_1.NotFoundException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return await this._unitService.activateOne(foundUnitHydrant.unit.id);
    }
};
UnitHydrantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_hydrant_entity_1.UnitHydrantEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        unit_service_1.UnitService])
], UnitHydrantService);
exports.UnitHydrantService = UnitHydrantService;
//# sourceMappingURL=unit-hydrant.service.js.map