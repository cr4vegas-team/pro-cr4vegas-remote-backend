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
exports.StationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const unit_service_1 = require("../../unit/unit/unit.service");
const typeorm_2 = require("typeorm");
const station_exception_msg_1 = require("./station-exception.msg");
const station_entity_1 = require("./station.entity");
let StationService = class StationService {
    constructor(_stationRepository, _unitService) {
        this._stationRepository = _stationRepository;
        this._unitService = _unitService;
    }
    async findAll() {
        const qb = await this._stationRepository
            .createQueryBuilder('stations')
            .leftJoinAndSelect('stations.units', 'units')
            .orderBy('stations.created', 'DESC');
        const stationsCount = await qb.getCount();
        const foundStations = await qb.getMany();
        return { stations: foundStations, count: stationsCount };
    }
    async findOne(id) {
        const qb = await this._stationRepository
            .createQueryBuilder('stations')
            .where('stations.id = :id', { id });
        const foundStation = await qb.getOne();
        return { station: foundStation };
    }
    async findOneWithUnits(id) {
        const qb = await this._stationRepository
            .createQueryBuilder('stations')
            .leftJoinAndSelect('stations.units', 'units')
            .where('stations.id = :id', { id });
        const foundStation = await qb.getOne();
        return { station: foundStation };
    }
    async createOne(dto) {
        const foundStation = await this._stationRepository
            .createQueryBuilder('stations')
            .where('stations.code = :code', { code: dto.code })
            .orWhere('stations.name = :name', { name: dto.name })
            .getOne();
        if (foundStation) {
            if (foundStation.name === dto.name) {
                throw new common_1.ConflictException(station_exception_msg_1.StationExceptionMSG.CONFLICT_NAME);
            }
            if (foundStation.code === dto.code) {
                throw new common_1.ConflictException(station_exception_msg_1.StationExceptionMSG.CONFLICT_CODE);
            }
        }
        const newStation = class_transformer_1.plainToClass(station_entity_1.StationEntity, dto);
        newStation.units = (await this._unitService.findAllByIds(dto.units)).units;
        const savedStation = await this._stationRepository.save(newStation);
        return { station: savedStation };
    }
    async updateOne(dto) {
        const foundStationConflit = await this._stationRepository
            .createQueryBuilder('stations')
            .where('stations.code = :code', { code: dto.code })
            .orWhere('stations.name = :name', { name: dto.name })
            .getOne();
        if (foundStationConflit && foundStationConflit.id !== dto.id) {
            if (foundStationConflit.name === dto.name) {
                throw new common_1.ConflictException(station_exception_msg_1.StationExceptionMSG.CONFLICT_NAME);
            }
            if (foundStationConflit.code === dto.code) {
                throw new common_1.ConflictException(station_exception_msg_1.StationExceptionMSG.CONFLICT_CODE);
            }
        }
        let foundStation = await this._stationRepository
            .createQueryBuilder('stations')
            .where('stations.id = :id', { id: dto.id })
            .getOne();
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND);
        }
        foundStation = class_transformer_1.plainToClass(station_entity_1.StationEntity, dto);
        foundStation.units = (await this._unitService.findAllByIds(dto.units)).units;
        const updatedStation = await this._stationRepository.save(foundStation);
        return { station: updatedStation };
    }
    async deleteOne(id) {
        const foundStation = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND);
        }
        const updatedStation = await this._stationRepository.update(id, { active: 0 });
        return updatedStation.affected > 0;
    }
    async activateOne(id) {
        const foundStation = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND);
        }
        const updatedSector = await this._stationRepository.update(id, { active: 1 });
        return updatedSector.affected > 0;
    }
};
StationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(station_entity_1.StationEntity)),
    __param(1, common_1.Inject(common_1.forwardRef(() => unit_service_1.UnitService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        unit_service_1.UnitService])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map