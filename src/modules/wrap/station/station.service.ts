import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STATIONS_TEST } from 'src/database/static_data/stations';
import { Repository, UpdateResult } from 'typeorm';
import { StationExceptionMSG } from './station-exception.msg';
import { StationDto } from './station.dto';
import { StationEntity } from './station.entity';
import { StationRO, StationsRO } from './station.interfaces';

@Injectable()
export class StationService {

    constructor(
        @InjectRepository(StationEntity)
        private readonly _stationRepository: Repository<StationEntity>,
    ) {
        let stations: StationEntity[] = STATIONS_TEST;
        for (let station of stations) {
            this.createOne(station);
        }
    }

    async findAll(active?: number): Promise<StationsRO> {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.leftJoinAndSelect("stations.units", "units");
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("stations.active = :active", { active });
        }
        const stationsCount: number = await qb.getCount();
        qb.orderBy("stations.created", "DESC");
        const foundStations: StationEntity[] = await qb.getMany();
        return { stations: foundStations, count: stationsCount };
    }

    async findOne(id: number, active?: number): Promise<StationRO> {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.leftJoinAndSelect('stations.units', 'units')
        qb.where("stations.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("stations.active = :active", { active });
        }
        const foundStation: StationEntity = await qb.getOne();
        return { station: foundStation };
    }

    async createOne(dto: StationDto): Promise<StationRO> {
        const foundStation: StationEntity = await this._stationRepository.createQueryBuilder('stations')
            .where('stations.code = :code', { code: dto.code })
            .orWhere('stations.name = :name', { name: dto.name })
            .getOne();
        if (foundStation) {
            throw new ConflictException(StationExceptionMSG.CONFLICT_CODE);
        }
        let newStation: StationEntity = new StationEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        newStation.altitude = dto.altitude;
        newStation.latitude = dto.latitude;
        newStation.longitude = dto.longitude;
        let savedStation: StationEntity = await this._stationRepository.save(newStation);
        return { station: savedStation };
    }

    async updateOne(id: number, dto: StationDto): Promise<boolean> {
        let foundStation: StationEntity = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(StationExceptionMSG.NOT_FOUND_ID);
        }
        foundStation.code = dto.code;
        foundStation.name = dto.name;
        foundStation.description = dto.description;
        foundStation.altitude = dto.altitude;
        foundStation.latitude = dto.latitude;
        foundStation.longitude = dto.longitude;
        let updatedStation: StationEntity = await this._stationRepository.save(foundStation);
        return updatedStation ? true : false;
    }

    async deleteOne(id: number): Promise<Boolean> {
        let foundStation: StationEntity = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(StationExceptionMSG.NOT_FOUND_ID);
        }
        let updatedStation: UpdateResult = await this._stationRepository.update(id, { active: false });
        return updatedStation.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        let foundStation: StationEntity = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(StationExceptionMSG.NOT_FOUND_ID);
        }
        let updatedSector: UpdateResult = await this._stationRepository.update(id, { active: true });
        return updatedSector.affected > 0;
    }

}
