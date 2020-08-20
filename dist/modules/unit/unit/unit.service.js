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
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./unit.entity");
const unit_exception_msg_1 = require("./unit-exception.msg");
const sector_service_1 = require("../../wrap/sector/sector.service");
const station_service_1 = require("../../wrap/station/station.service");
const set_service_1 = require("../../wrap/set/set.service");
const sector_entity_1 = require("../../wrap/sector/sector.entity");
const station_entity_1 = require("../../wrap/station/station.entity");
const set_entity_1 = require("../../wrap/set/set.entity");
let UnitService = class UnitService {
    constructor(_unitRepository, _sectorService, _stationService, _setService) {
        this._unitRepository = _unitRepository;
        this._sectorService = _sectorService;
        this._stationService = _stationService;
        this._setService = _setService;
    }
    async findAll(query) {
        const qb = await this._unitRepository.createQueryBuilder('units');
        qb.where("1 = 1");
        const unitsCount = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("units.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("units.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("units.created", "DESC");
        const foundUnits = await qb.getMany();
        return { units: foundUnits, count: unitsCount };
    }
    async findOne(query) {
        const qb = await this._unitRepository.createQueryBuilder('units');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("units.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("units.id = :id", { id: `${query.id}` });
        }
        const foundUnit = await qb.getOne();
        return { unit: foundUnit };
    }
    async createOne(dto, unitType) {
        const newUnit = new unit_entity_1.UnitEntity();
        newUnit.code = dto.code;
        newUnit.unitType = unitType;
        newUnit.sets = [];
        newUnit.altitude = dto.altitude;
        newUnit.latitude = dto.latitude;
        newUnit.longitude = dto.longitude;
        newUnit.description = dto.description;
        if (dto.sectorId >= 0) {
            const sector = (await this._sectorService.findOne(dto.sectorId)).sector;
            if (sector) {
                newUnit.sector = sector;
            }
        }
        if (dto.stationId >= 0) {
            const station = (await this._stationService.findOne(dto.stationId)).station;
            if (station) {
                newUnit.station = station;
            }
        }
        if (dto.setsIds && dto.setsIds.length > 0) {
            dto.setsIds.forEach(async (setId) => {
                if (setId >= 0) {
                    const set = (await this._setService.findOne(setId)).set;
                    if (set) {
                        newUnit.sets.push(set);
                    }
                }
            });
        }
        const savedUnit = await this._unitRepository.save(newUnit);
        return { unit: savedUnit };
    }
    async updateOne(id, dto) {
        const foundUnit = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        foundUnit.code = dto.code;
        foundUnit.altitude = dto.altitude;
        foundUnit.latitude = dto.latitude;
        foundUnit.longitude = dto.longitude;
        foundUnit.description = dto.description;
        if (dto.sectorId >= 0) {
            const sector = (await this._sectorService.findOne(dto.sectorId)).sector;
            if (sector) {
                foundUnit.sector = sector;
            }
        }
        if (dto.stationId >= 0) {
            const station = (await this._stationService.findOne(dto.stationId)).station;
            if (station) {
                foundUnit.station = station;
            }
        }
        if (dto.setsIds && dto.setsIds.length > 0) {
            dto.setsIds.forEach(async (setId) => {
                if (setId >= 0) {
                    const set = (await this._setService.findOne(setId)).set;
                    if (set) {
                        foundUnit.sets.push(set);
                    }
                }
            });
        }
        const updatedUnit = await this._unitRepository.update(foundUnit.id, foundUnit);
        return updatedUnit.affected > 0;
    }
    async deleteOne(id) {
        const foundUnit = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit = await this._unitRepository.update(id, { active: 0 });
        return updatedUnit.affected > 0;
    }
    async activateOne(id) {
        const foundUnit = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new common_1.NotFoundException(unit_exception_msg_1.UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit = await this._unitRepository.update(id, { active: 1 });
        return updatedUnit.affected > 0;
    }
};
UnitService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(unit_entity_1.UnitEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sector_service_1.SectorService,
        station_service_1.StationService,
        set_service_1.SetService])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map