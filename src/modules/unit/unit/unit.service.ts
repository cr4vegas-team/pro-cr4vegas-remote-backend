import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UnitType } from './unit-types.constant';
import { UnitEntity } from './unit.entity';
import { UnitExceptionMSG } from './unit-exception.msg';
import { UnitRO, UnitsRO } from './unit.interfaces';
import { UnitDto } from './unit.dto';

@Injectable()
export class UnitService {

    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(query): Promise<UnitsRO> {
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

    async createOne(dto: UnitDto): Promise<UnitRO> {
        let newUnit: UnitEntity = new UnitEntity();
        newUnit.unitType = UnitType[dto.unitType];
        newUnit.altitude = dto.altitude;
        newUnit.latitude = dto.latitude;
        newUnit.longitude = dto.longitude;
        newUnit.description = dto.description;
        let savedUnit: UnitEntity = await this._unitRepository.save(newUnit);
        return { unit: savedUnit };
    }

    async updateOne(id: number, dto: UnitDto): Promise<UnitRO> {
        let foundUnit: UnitEntity = await this._unitRepository.findOne(id);
        if (!foundUnit) {
            console.log(id);
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        foundUnit.unitType = UnitType[dto.unitType];
        foundUnit.altitude = dto.altitude;
        foundUnit.latitude = dto.latitude;
        foundUnit.longitude = dto.longitude;
        foundUnit.description = dto.description;
        let updatedUnit: UnitEntity = await this._unitRepository.save(foundUnit);
        return { unit: updatedUnit };
    }

    async deleteOne(id: number): Promise<Boolean> {
        let foundUnit: UnitEntity = await this._unitRepository.findOne(id);
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        let updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: false });
        return updatedUnit.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        let foundUnit: UnitEntity = await this._unitRepository.findOne(id);
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        let updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: true });
        return updatedUnit.affected > 0;
    }

}
