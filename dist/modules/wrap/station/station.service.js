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
const stations_1 = require("../../../database/static_data/stations");
const typeorm_2 = require("typeorm");
const station_exception_msg_1 = require("./station-exception.msg");
const station_entity_1 = require("./station.entity");
let StationService = class StationService {
    constructor(_stationRepository) {
        this._stationRepository = _stationRepository;
        const stations = stations_1.STATIONS_TEST;
        for (const station of stations) {
            this.createOne(station);
        }
    }
    async findAll(active) {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.leftJoinAndSelect("stations.units", "units");
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("stations.active = :active", { active });
        }
        const stationsCount = await qb.getCount();
        qb.orderBy("stations.created", "DESC");
        const foundStations = await qb.getMany();
        return { stations: foundStations, count: stationsCount };
    }
    async findOne(id, active) {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.leftJoinAndSelect('stations.units', 'units');
        qb.where("stations.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("stations.active = :active", { active });
        }
        const foundStation = await qb.getOne();
        return { station: foundStation };
    }
    async createOne(dto) {
        const foundStation = await this._stationRepository.createQueryBuilder('stations')
            .where('stations.code = :code', { code: dto.code })
            .orWhere('stations.name = :name', { name: dto.name })
            .getOne();
        if (foundStation) {
            throw new common_1.ConflictException(station_exception_msg_1.StationExceptionMSG.CONFLICT_CODE);
        }
        const newStation = new station_entity_1.StationEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        newStation.altitude = dto.altitude;
        newStation.latitude = dto.latitude;
        newStation.longitude = dto.longitude;
        const savedStation = await this._stationRepository.save(newStation);
        return { station: savedStation };
    }
    async updateOne(id, dto) {
        const foundStation = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND_ID);
        }
        foundStation.code = dto.code;
        foundStation.name = dto.name;
        foundStation.description = dto.description;
        foundStation.altitude = dto.altitude;
        foundStation.latitude = dto.latitude;
        foundStation.longitude = dto.longitude;
        const updatedStation = await this._stationRepository.save(foundStation);
        return updatedStation ? true : false;
    }
    async deleteOne(id) {
        const foundStation = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND_ID);
        }
        const updatedStation = await this._stationRepository.update(id, { active: false });
        return updatedStation.affected > 0;
    }
    async activateOne(id) {
        const foundStation = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new common_1.NotFoundException(station_exception_msg_1.StationExceptionMSG.NOT_FOUND_ID);
        }
        const updatedSector = await this._stationRepository.update(id, { active: true });
        return updatedSector.affected > 0;
    }
};
StationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(station_entity_1.StationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map