import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UnitType } from './unit-types.constant';
import { UnitEntity } from './unit.entity';
import { UnitExceptionMSG } from './unit-exception.msg';
import { UnitRO, UnitsRO } from './unit.interfaces';
import { UnitDto } from './unit.dto';
import { SectorService } from 'src/modules/wrap/sector/sector.service';
import { StationService } from 'src/modules/wrap/station/station.service';
import { SetService } from 'src/modules/wrap/set/set.service';
import { SectorEntity } from 'src/modules/wrap/sector/sector.entity';
import { StationEntity } from 'src/modules/wrap/station/station.entity';
import { SetEntity } from 'src/modules/wrap/set/set.entity';

@Injectable()
export class UnitService {

    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
        private readonly _sectorService: SectorService,
        private readonly _stationService: StationService,
        private readonly _setService: SetService,
    ) { }

    async findAll(query): Promise<UnitsRO> {
        const qb = await this._unitRepository.createQueryBuilder('units');
        qb.where("1 = 1");
        const unitsCount: number = await qb.getCount();
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

    async findOne(query): Promise<UnitRO> {
        const qb = await this._unitRepository.createQueryBuilder('units');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("units.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("units.id = :id", { id: `${query.id}` });
        }
        const foundUnit: UnitEntity = await qb.getOne();
        return { unit: foundUnit };
    }

    async createOne(dto: UnitDto, unitType: UnitType): Promise<UnitRO> {
        let newUnit: UnitEntity = new UnitEntity();
        newUnit.code = dto.code;
        newUnit.unitType = unitType;
        newUnit.sets = [];
        newUnit.altitude = dto.altitude;
        newUnit.latitude = dto.latitude;
        newUnit.longitude = dto.longitude;
        newUnit.description = dto.description;
        if (dto.sectorId >= 0) {
            const sector: SectorEntity = (await this._sectorService.findOne(dto.sectorId)).sector;
            if (sector) {
                newUnit.sector = sector;
            }
        }
        if (dto.stationId >= 0) {
            const station: StationEntity = (await this._stationService.findOne(dto.stationId)).station;
            if (station) {
                newUnit.station = station;
            }
        }
        if (dto.setsIds && dto.setsIds.length > 0) {
            dto.setsIds.forEach(async setId => {
                if (setId >= 0) {
                    const set: SetEntity = (await this._setService.findOne(setId)).set;
                    if (set) {
                        newUnit.sets.push(set);
                    }
                }
            })
        }
        let savedUnit: UnitEntity = await this._unitRepository.save(newUnit);
        return { unit: savedUnit };
    }

    async updateOne(id: number, dto: UnitDto): Promise<boolean> {
        let foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        foundUnit.code = dto.code;
        foundUnit.altitude = dto.altitude;
        foundUnit.latitude = dto.latitude;
        foundUnit.longitude = dto.longitude;
        foundUnit.description = dto.description;
        if (dto.sectorId >= 0) {
            const sector: SectorEntity = (await this._sectorService.findOne(dto.sectorId)).sector;
            if (sector) {
                foundUnit.sector = sector;
            }
        }
        if (dto.stationId >= 0) {
            const station: StationEntity = (await this._stationService.findOne(dto.stationId)).station;
            if (station) {
                foundUnit.station = station;
            }
        }
        if (dto.setsIds && dto.setsIds.length > 0) {
            dto.setsIds.forEach(async setId => {
                if (setId >= 0) {
                    const set: SetEntity = (await this._setService.findOne(setId)).set;
                    if (set) {
                        foundUnit.sets.push(set);
                    }
                }
            })
        }
        let updatedUnit: UpdateResult = await this._unitRepository.update(foundUnit.id, foundUnit);
        return updatedUnit.affected > 0;
    }

    async deleteOne(id: number): Promise<Boolean> {
        let foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        let updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 0 });
        return updatedUnit.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        let foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        let updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 1 });
        return updatedUnit.affected > 0;
    }

}
