import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SectorDto } from './sector.dto';
import { SectorEntity } from './sector.entity';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorExceptionMSG } from './set-exception.msg';

@Injectable()
export class SectorService {

    constructor(
        @InjectRepository(SectorEntity)
        private readonly _sectorRepository: Repository<SectorEntity>,
    ) { }

    async findAll(query): Promise<SectorsRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.where("1 = 1");
        const stationsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("sectors.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("sectors.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("sectors.created", "DESC");
        const foundSectors: SectorEntity[] = await qb.getMany();
        return { sectors: foundSectors, count: stationsCount };
    }

    async findOne(query): Promise<SectorRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("sectors.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("sectors.id = :id", { id: `${query.id}` });
        }
        const foundSector: SectorEntity = await qb.getOne();
        return { sector: foundSector };
    }

    async createOne(dto: SectorDto): Promise<SectorRO> {
        let newStation: SectorEntity = new SectorEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        let savedSector: SectorEntity = await this._sectorRepository.save(newStation);
        return { sector: savedSector };
    }

    async updateOne(id: number, dto: SectorDto): Promise<SectorRO> {
        let foundStation: SectorEntity = await this._sectorRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        foundStation.code = dto.code;
        foundStation.name = dto.name;
        foundStation.description = dto.description;
        let updatedSector: SectorEntity = await this._sectorRepository.save(foundStation);
        return { sector: updatedSector };
    }

    async deleteOne(id: number): Promise<Boolean> {
        let foundSector: SectorEntity = await this._sectorRepository.findOne(id);
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        let updatedSecvtor: UpdateResult = await this._sectorRepository.update(id, { active: false });
        return updatedSecvtor.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        let foundSector: SectorEntity = await this._sectorRepository.findOne(id);
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        let updatedSector: UpdateResult = await this._sectorRepository.update(id, { active: true });
        return updatedSector.affected > 0;
    }


}
