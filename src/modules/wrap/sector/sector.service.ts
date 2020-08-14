import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async findAll(active?: number): Promise<SectorsRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.leftJoinAndSelect("sectors.units", "units");
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("sectors.active = :active", { active });
        }
        const stationsCount: number = await qb.getCount();
        qb.orderBy("sectors.created", "DESC");
        const foundSectors: SectorEntity[] = await qb.getMany();
        return { sectors: foundSectors, count: stationsCount };
    }

    async findOne(id: number, active?: number): Promise<SectorRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors');
        qb.leftJoinAndSelect("sectors.units", "units");
        qb.where("sectors.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("sectors.active = :active", { active });
        }
        const foundSector: SectorEntity = await qb.getOne();
        return { sector: foundSector };
    }

    async createOne(dto: SectorDto): Promise<SectorRO> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.code = :code', { code: dto.code })
            .orWhere('sectors.name = :name', { name: dto.name })
            .getOne();
        if (foundSector) {
            throw new ConflictException(SectorExceptionMSG.CONFLICT);
        }
        let newStation: SectorEntity = new SectorEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        let savedSector: SectorEntity = await this._sectorRepository.save(newStation);
        return { sector: savedSector };
    }

    async updateOne(id: number, dto: SectorDto): Promise<boolean> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        foundSector.code = dto.code;
        foundSector.name = dto.name;
        foundSector.description = dto.description;
        let updatedSector: SectorEntity = await this._sectorRepository.save(foundSector);
        return updatedSector ? true : false;
    }

    async deleteOne(id: number): Promise<Boolean> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        let updatedSecvtor: UpdateResult = await this._sectorRepository.update(id, { active: false });
        return updatedSecvtor.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        let updatedSector: UpdateResult = await this._sectorRepository.update(id, { active: true });
        return updatedSector.affected > 0;
    }


}
