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
const unit_type_table_enum_1 = require("../unit/unit-type-table.enum");
const unit_type_enum_1 = require("../unit/unit-type.enum");
const unit_hydrant_exception_messages_1 = require("./unit-hydrant-exception-messages");
const unit_hydrant_entity_1 = require("./unit-hydrant.entity");
let UnitHydrantService = class UnitHydrantService {
    constructor(_unitHydrantRepository) {
        this._unitHydrantRepository = _unitHydrantRepository;
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
        const foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundUnitHydrant) {
            throw new common_1.ConflictException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.CONFLICT);
        }
        const newUnitHydrant = class_transformer_1.plainToClass(unit_hydrant_entity_1.UnitHydrantEntity, dto);
        newUnitHydrant.unit.unitType = unit_type_enum_1.UnitTypeEnum.UNIT_HYDRANT;
        newUnitHydrant.unit.table = unit_type_table_enum_1.UnitTypeTableEnum.UNIT_HYDRANT;
        const savedUnitHydrant = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }
    async updateOne(dto) {
        try {
            let foundUnitHydrant = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
                .leftJoinAndSelect('units_hydrants.unit', 'unit')
                .where('units_hydrants.id = :id', { id: dto.id })
                .andWhere('unit.id = :id', { id: dto.unit.id })
                .getOne();
            if (!foundUnitHydrant) {
                throw new common_1.NotFoundException(unit_hydrant_exception_messages_1.UnitHydrantExceptionMSG.NOT_FOUND);
            }
            foundUnitHydrant = class_transformer_1.plainToClass(unit_hydrant_entity_1.UnitHydrantEntity, dto);
            const savedUnitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
            return { unitHydrant: savedUnitHydrant };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UnitHydrantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_hydrant_entity_1.UnitHydrantEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitHydrantService);
exports.UnitHydrantService = UnitHydrantService;
//# sourceMappingURL=unit-hydrant.service.js.map