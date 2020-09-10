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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const sector_service_1 = require("../../wrap/sector/sector.service");
const set_service_1 = require("../../wrap/set/set.service");
const station_service_1 = require("../../wrap/station/station.service");
const typeorm_2 = require("typeorm");
const unit_exception_msg_1 = require("./unit-exception.msg");
const unit_entity_1 = require("./unit.entity");
let UnitService = class UnitService {
    constructor(_unitRepository, _setService, _sectorService, _stationService) {
        this._unitRepository = _unitRepository;
        this._setService = _setService;
        this._sectorService = _sectorService;
        this._stationService = _stationService;
    }
    async findAll() {
        const qb = await this._unitRepository.createQueryBuilder('units');
        const units = await qb.getMany();
        const count = await qb.getCount();
        return { units, count };
    }
    async findAllByIds(ids) {
        const qb = await this._unitRepository.createQueryBuilder('units')
            .whereInIds(ids);
        const units = await qb.getMany();
        const count = await qb.getCount();
        return { units, count };
    }
    async delete(id) {
        const foundUnit = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit = await this._unitRepository.update(id, { active: 0 });
        return updatedUnit.affected > 0;
    }
    async activate(id) {
        const foundUnit = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit = await this._unitRepository.update(id, { active: 1 });
        return updatedUnit.affected > 0;
    }
    async create(unitCreateDto, unitType, unitTypeTable) {
        const foundUnitByCode = await this._unitRepository.findOne({ where: { code: unitCreateDto.code } });
        if (foundUnitByCode) {
            throw new common_1.ConflictException(unit_exception_msg_1.UnitExceptionMSG.CONFLIC);
        }
        const newUnit = class_transformer_1.plainToClass(unit_entity_1.UnitEntity, unitCreateDto);
        newUnit.sector = (await this._sectorService.findOne(unitCreateDto.sector)).sector;
        newUnit.station = (await this._stationService.findOne(unitCreateDto.station)).station;
        newUnit.sets = (await this._setService.findAllByIds(unitCreateDto.sets)).sets;
        newUnit.unitType = unitType;
        newUnit.table = unitTypeTable;
        const savedUnit = await this._unitRepository.save(newUnit);
        return { unit: savedUnit };
    }
    async update(unitUpdateDto) {
        const foundUnitByCode = await this._unitRepository.findOne({ where: { code: unitUpdateDto.code } });
        if (foundUnitByCode && foundUnitByCode.id !== unitUpdateDto.id) {
            throw new common_1.ConflictException(unit_exception_msg_1.UnitExceptionMSG.CONFLIC);
        }
        let foundUnit = await this._unitRepository.findOne(unitUpdateDto.id);
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        foundUnit = class_transformer_1.plainToClassFromExist(foundUnit, unitUpdateDto);
        foundUnit.sets = (await this._setService.findAllByIds(unitUpdateDto.sets)).sets;
        foundUnit.sector = (await this._sectorService.findOne(unitUpdateDto.sector)).sector;
        foundUnit.station = (await this._stationService.findOne(unitUpdateDto.station)).station;
        const savedUnit = await this._unitRepository.save(foundUnit);
        return { unit: savedUnit };
    }
};
UnitService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_entity_1.UnitEntity)),
    __param(1, common_1.Inject(common_1.forwardRef(() => set_service_1.SetService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => sector_service_1.SectorService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => station_service_1.StationService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        set_service_1.SetService,
        sector_service_1.SectorService,
        station_service_1.StationService])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map