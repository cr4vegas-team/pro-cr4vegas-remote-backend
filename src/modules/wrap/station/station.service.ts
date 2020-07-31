import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    ) { }


    async findAll(query): Promise<StationsRO> {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.where("1 = 1");
        const stationsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("stations.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("stations.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("stations.created", "DESC");
        const foundStations: StationEntity[] = await qb.getMany();
        return { stations: foundStations, count: stationsCount };
    }

    async findOne(query): Promise<StationRO> {
        const qb = await this._stationRepository.createQueryBuilder('stations');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("stations.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("stations.id = :id", { id: `${query.id}` });
        }
        const foundStation: StationEntity = await qb.getOne();
        return { station: foundStation };
    }

    async createOne(dto: StationDto): Promise<StationRO> {
        let newStation: StationEntity = new StationEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        let savedStation: StationEntity = await this._stationRepository.save(newStation);
        return { station: savedStation };
    }

    async updateOne(id: number, dto: StationDto): Promise<StationRO> {
        let foundStation: StationEntity = await this._stationRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(StationExceptionMSG.NOT_FOUND_ID);
        }
        foundStation.code = dto.code;
        foundStation.name = dto.name;
        foundStation.description = dto.description;
        let updatedStation: StationEntity = await this._stationRepository.save(foundStation);
        return { station: updatedStation };
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
