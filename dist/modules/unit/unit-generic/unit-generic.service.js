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
exports.UnitGenericService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const unit_type_table_enum_1 = require("../unit/unit-type-table.enum");
const unit_type_enum_1 = require("../unit/unit-type.enum");
const unit_generic_exception_messages_1 = require("./unit-generic-exception-messages");
const unit_generic_entity_1 = require("./unit-generic.entity");
let UnitGenericService = class UnitGenericService {
    constructor(_unitGenericRepository) {
        this._unitGenericRepository = _unitGenericRepository;
    }
    async findAll() {
        const qb = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");
        const unitsGenericsCount = await qb.getCount();
        const foundUnitsGenerics = await qb.getMany();
        return { unitsGenerics: foundUnitsGenerics, count: unitsGenericsCount };
    }
    async findOneById(id) {
        const qb = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_generics.id = :id", { id });
        const foundUnitGeneric = await qb.getOne();
        return { unitGeneric: foundUnitGeneric };
    }
    async createOne(dto) {
        const foundUnitGeneric = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundUnitGeneric) {
            throw new common_1.ConflictException(unit_generic_exception_messages_1.UnitGenericExceptionMSG.CONFLICT);
        }
        const newUnitGeneric = class_transformer_1.plainToClass(unit_generic_entity_1.UnitGenericEntity, dto);
        newUnitGeneric.unit.unitType = unit_type_enum_1.UnitTypeEnum.UNIT_GENERIC;
        newUnitGeneric.unit.table = unit_type_table_enum_1.UnitTypeTableEnum.UNIT_GENERIC;
        const savedUnitGeneric = await this._unitGenericRepository.save(newUnitGeneric);
        return { unitGeneric: savedUnitGeneric };
    }
    async updateOne(dto) {
        let foundUnitGeneric = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .where('unit.id = :id', { id: dto.unit.id })
            .orWhere('units_generics.id = :id', { id: dto.id })
            .getOne();
        if (!foundUnitGeneric) {
            throw new common_1.NotFoundException(unit_generic_exception_messages_1.UnitGenericExceptionMSG.NOT_FOUND);
        }
        foundUnitGeneric = class_transformer_1.plainToClass(unit_generic_entity_1.UnitGenericEntity, dto);
        const savedUnitGeneric = await this._unitGenericRepository.save(foundUnitGeneric);
        return { unitGeneric: savedUnitGeneric };
    }
};
UnitGenericService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_generic_entity_1.UnitGenericEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitGenericService);
exports.UnitGenericService = UnitGenericService;
//# sourceMappingURL=unit-generic.service.js.map