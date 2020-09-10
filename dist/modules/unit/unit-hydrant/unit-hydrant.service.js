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
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const unit_exception_msg_1 = require("../unit/unit-exception.msg");
const unit_type_table_enum_1 = require("../unit/unit-type-table.enum");
const unit_type_enum_1 = require("../unit/unit-type.enum");
const unit_service_1 = require("../unit/unit.service");
const unit_hydrant_exception_messages_1 = require("./unit-hydrant-exception-messages");
const unit_hydrant_entity_1 = require("./unit-hydrant.entity");
let UnitHydrantService = class UnitHydrantService {
    constructor(_unitHydrantRepository, _unitService) {
        this._unitHydrantRepository = _unitHydrantRepository;
        this._unitService = _unitService;
    }
    async findAll() {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");
        const unitsHydrantsCount = await qb.getCount();
        const foundUnitsHydrants = await qb.getMany();
        return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
    }
    async findOneById(id) {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_hydrants.id = :id", { id });
        const foundUnitHydrant = await qb.getOne();
        return { unitHydrant: foundUnitHydrant };
    }
    async createOne(dto) {
        const savedUnit = (await this._unitService.create(dto.unit, unit_type_enum_1.UnitTypeEnum.UNIT_HYDRANT, unit_type_table_enum_1.UnitTypeTableEnum.UNIT_HYDRANT)).unit;
        const newUnitHydrant = class_transformer_1.plainToClass(unit_hydrant_entity_1.UnitHydrantEntity, dto);
        newUnitHydrant.unit = savedUnit;
        const savedUnitHydrant = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }
    async updateOne(dto) {
        let foundUnitHydrant = await this._unitHydrantRepository.findOne(dto.id);
        if (!foundUnitHydrant) {
            throw new common_1.NotFoundException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND);
        }
        let foundUnitHydrantUnitId = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.unit.id = :id', { id: dto.unit.id })
            .getOne();
        if (foundUnitHydrantUnitId && foundUnitHydrantUnitId.id !== dto.id) {
            throw new common_1.ConflictException(unit_exception_msg_1.UnitExceptionMSG.CONFLIC);
        }
        const updatedUnit = (await this._unitService.update(dto.unit)).unit;
        foundUnitHydrant = class_transformer_1.plainToClass(unit_hydrant_entity_1.UnitHydrantEntity, dto);
        foundUnitHydrant.unit = updatedUnit;
        const savedUnitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
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