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
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const unit_service_1 = require("../../unit/unit/unit.service");
const sector_exception_msg_1 = require("./sector-exception.msg");
const sector_entity_1 = require("./sector.entity");
let SectorService = class SectorService {
    constructor(_sectorRepository, _unitService) {
        this._sectorRepository = _sectorRepository;
        this._unitService = _unitService;
    }
    async findAll() {
        const qb = await this._sectorRepository
            .createQueryBuilder('sectors')
            .leftJoinAndSelect('sectors.units', 'units')
            .orderBy('sectors.created', 'DESC');
        const stationsCount = await qb.getCount();
        const foundSectors = await qb.getMany();
        return { sectors: foundSectors, count: stationsCount };
    }
    async findOne(id) {
        const qb = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.id = :id', { id });
        const foundSector = await qb.getOne();
        return { sector: foundSector };
    }
    async findOneWithUnits(id) {
        const qb = await this._sectorRepository
            .createQueryBuilder('sectors')
            .leftJoinAndSelect('sectors.units', 'units')
            .where('sectors.id = :id', { id });
        const foundSector = await qb.getOne();
        return { sector: foundSector };
    }
    async createOne(dto) {
        const foundSector = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.code = :code', { code: dto.code })
            .orWhere('sectors.name = :name', { name: dto.name })
            .getOne();
        if (foundSector) {
            if (foundSector.name === dto.name) {
                throw new common_1.ConflictException(sector_exception_msg_1.SectorExceptionMSG.CONFLICT_NAME);
            }
            if (foundSector.code === dto.code) {
                throw new common_1.ConflictException(sector_exception_msg_1.SectorExceptionMSG.CONFLICT_CODE);
            }
        }
        const newSector = class_transformer_1.plainToClass(sector_entity_1.SectorEntity, dto);
        newSector.units = (await this._unitService.findAllByIds(dto.units)).units;
        const savedSector = await this._sectorRepository.save(newSector);
        return { sector: savedSector };
    }
    async updateOne(dto) {
        const foundSectorConflict = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.code = :code', { code: dto.code })
            .orWhere('sectors.name = :name', { name: dto.name })
            .getOne();
        if (foundSectorConflict && foundSectorConflict.id !== dto.id) {
            if (foundSectorConflict.name === dto.name) {
                throw new common_1.ConflictException(sector_exception_msg_1.SectorExceptionMSG.CONFLICT_NAME);
            }
            if (foundSectorConflict.code === dto.code) {
                throw new common_1.ConflictException(sector_exception_msg_1.SectorExceptionMSG.CONFLICT_CODE);
            }
        }
        let foundSector = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.id = :id', { id: dto.id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(sector_exception_msg_1.SectorExceptionMSG.NOT_FOUND);
        }
        foundSector = class_transformer_1.plainToClass(sector_entity_1.SectorEntity, dto);
        foundSector.units = (await this._unitService.findAllByIds(dto.units)).units;
        const updatedSector = await this._sectorRepository.save(foundSector);
        return { sector: updatedSector };
    }
    async deleteOne(id) {
        const foundSector = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(sector_exception_msg_1.SectorExceptionMSG.NOT_FOUND);
        }
        return ((await this._sectorRepository.update(id, { active: 0 })).affected > 0);
    }
    async activateOne(id) {
        const foundSector = await this._sectorRepository
            .createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new common_1.NotFoundException(sector_exception_msg_1.SectorExceptionMSG.NOT_FOUND);
        }
        return ((await this._sectorRepository.update(id, { active: 1 })).affected > 0);
    }
};
SectorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(sector_entity_1.SectorEntity)),
    __param(1, common_1.Inject(common_1.forwardRef(() => unit_service_1.UnitService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        unit_service_1.UnitService])
], SectorService);
exports.SectorService = SectorService;
//# sourceMappingURL=sector.service.js.map