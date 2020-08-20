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
exports.SectorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sector_entity_1 = require("./sector.entity");
const set_exception_msg_1 = require("./set-exception.msg");
let SectorService = class SectorService {
    constructor(_sectorRepository) {
        this._sectorRepository = _sectorRepository;
    }
    async findAll(active) {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.leftJoinAndSelect("sectors.units", "units");
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("sectors.active = :active", { active });
        }
        const stationsCount = await qb.getCount();
        qb.orderBy("sectors.created", "DESC");
        const foundSectors = await qb.getMany();
        return { sectors: foundSectors, count: stationsCount };
    }
    async findOne(id, active) {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.leftJoinAndSelect("sectors.units", "units");
        qb.where("sectors.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("sectors.active = :active", { active });
        }
        const foundSector = await qb.getOne();
        return { sector: foundSector };
    }
    async createOne(dto) {
        const foundSector = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.code = :code', { code: dto.code })
            .orWhere('sectors.name = :name', { name: dto.name })
            .getOne();
        if (foundSector) {
            throw new common_1.ConflictException(set_exception_msg_1.SectorExceptionMSG.CONFLICT);
        }
        const newStation = new sector_entity_1.SectorEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        const savedSector = await this._sectorRepository.save(newStation);
        return { sector: savedSector };
    }
    async updateOne(id, dto) {
        const foundSector = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(set_exception_msg_1.SectorExceptionMSG.NOT_FOUND_ID);
        }
        foundSector.code = dto.code;
        foundSector.name = dto.name;
        foundSector.description = dto.description;
        const updatedSector = await this._sectorRepository.save(foundSector);
        return updatedSector ? true : false;
    }
    async deleteOne(id) {
        const foundSector = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(set_exception_msg_1.SectorExceptionMSG.NOT_FOUND_ID);
        }
        const updatedSecvtor = await this._sectorRepository.update(id, { active: false });
        return updatedSecvtor.affected > 0;
    }
    async activateOne(id) {
        const foundSector = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(set_exception_msg_1.SectorExceptionMSG.NOT_FOUND_ID);
        }
        const updatedSector = await this._sectorRepository.update(id, { active: true });
        return updatedSector.affected > 0;
    }
};
SectorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(sector_entity_1.SectorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SectorService);
exports.SectorService = SectorService;
//# sourceMappingURL=sector.service.js.map