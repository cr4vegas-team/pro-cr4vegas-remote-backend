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
exports.UnitPondService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const unit_exception_msg_1 = require("../unit/unit-exception.msg");
const unit_type_table_enum_1 = require("../unit/unit-type-table.enum");
const unit_type_enum_1 = require("../unit/unit-type.enum");
const unit_service_1 = require("../unit/unit.service");
const unit_pond_exception_messages_1 = require("./unit-pond-exception-messages");
const unit_pond_entity_1 = require("./unit-pond.entity");
let UnitPondService = class UnitPondService {
    constructor(_unitPondRepository, _unitService) {
        this._unitPondRepository = _unitPondRepository;
        this._unitService = _unitService;
    }
    async findAll() {
        const qb = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");
        const unitsPondsCount = await qb.getCount();
        const foundUnitPond = await qb.getMany();
        return { unitsPonds: foundUnitPond, count: unitsPondsCount };
    }
    async findOneById(id) {
        const qb = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_ponds.id = :id", { id });
        const foundUnitPond = await qb.getOne();
        return { unitPond: foundUnitPond };
    }
    async createOne(dto) {
        const savedUnit = (await this._unitService.create(dto.unit, unit_type_enum_1.UnitTypeEnum.UNIT_HYDRANT, unit_type_table_enum_1.UnitTypeTableEnum.UNIT_HYDRANT)).unit;
        const newUnitPond = class_transformer_1.plainToClass(unit_pond_entity_1.UnitPondEntity, dto);
        newUnitPond.unit = savedUnit;
        const savedUnitPond = await this._unitPondRepository.save(newUnitPond);
        return { unitPond: savedUnitPond };
    }
    async updateOne(dto) {
        let foundUnitPond = await this._unitPondRepository.findOne(dto.id);
        if (!foundUnitPond) {
            throw new common_1.NotFoundException(unit_pond_exception_messages_1.UnitPondExceptionMSG.NOT_FOUND);
        }
        let foundUnitPondUnitId = await this._unitPondRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.unit.id = :id', { id: dto.unit.id })
            .getOne();
        if (foundUnitPondUnitId && foundUnitPondUnitId.id !== dto.id) {
            throw new common_1.ConflictException(unit_exception_msg_1.UnitExceptionMSG.CONFLIC);
        }
        const updatedUnit = (await this._unitService.update(dto.unit)).unit;
        foundUnitPond = class_transformer_1.plainToClass(unit_pond_entity_1.UnitPondEntity, dto);
        foundUnitPond.unit = updatedUnit;
        const savedUnitPond = await this._unitPondRepository.save(foundUnitPond);
        return { unitPond: savedUnitPond };
    }
};
UnitPondService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_pond_entity_1.UnitPondEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        unit_service_1.UnitService])
], UnitPondService);
exports.UnitPondService = UnitPondService;
//# sourceMappingURL=unit-pond.service.js.map