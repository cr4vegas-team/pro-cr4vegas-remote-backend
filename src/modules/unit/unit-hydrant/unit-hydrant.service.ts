

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitEntity } from '../unit.entity';
import { ReadUnitHydrantDto } from './dto';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';


@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(query: any): Promise<UnitsHydrantsRO> {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants');
        qb.where("1 = 1");
        qb.leftJoinAndSelect("units_hydrants.unit", "unit");
        const unitsHydrantsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("unit.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("units_hydrants.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("unit.created", "DESC");
        const foundUnitsHydrants: UnitHydrantEntity[] = await qb.getMany();
        const unitsHydrants: ReadUnitHydrantDto[] = foundUnitsHydrants.map(unitHydrant => plainToClass(ReadUnitHydrantDto, unitHydrant, { enableImplicitConversion: true }))
        return { unitsHydrants, unitsHydrantsCount };
    }

    async getOneByCode(code: string, query: any): Promise<UnitHydrantRO> {
        const qb = this._unitHydrantRepository.createQueryBuilder('units_hydrants');
        qb.leftJoinAndSelect("units_hydrants.unit", "unit");
        qb.where("unit.code = :code", { code });
        if ('active' in query) {
            qb.andWhere("units_hydrants.unit.active = :active", { active: `${query.active}` });
        }
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        const unitHydrant: ReadUnitHydrantDto = plainToClass(ReadUnitHydrantDto, foundUnitHydrant);
        return { unitHydrant };
    }

    async create(dto: CreateUnitHydrantDto): Promise<UnitHydrantRO> {
        const qb = this._unitHydrantRepository.createQueryBuilder("units_hydrants")
            .leftJoinAndSelect("units_hydrants.unit", "unit")
            .where("unit.code = :code", { code: dto.code });
        const foundUnit = await qb.getOne();
        if (foundUnit) {
            if (!(await foundUnit).unit) {
                throw new Error("Unit & UnitHydrant references error");
            }
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        }
        const unit: UnitEntity = new UnitEntity();
        unit.code = dto.code;
        unit.altitude = dto.altitude;
        unit.latitude = dto.latitude;
        unit.longitude = dto.longitude;
        unit.description = dto.description;
        const savedUnit: UnitEntity = await this._unitRepository.save(unit);
        let unitHydrant: UnitHydrantEntity = new UnitHydrantEntity();
        unitHydrant.unit = savedUnit;
        unitHydrant.size = dto.size;
        unitHydrant.valve = dto.valve;
        unitHydrant.bouy_alarm = dto.bouy_alarm;
        unitHydrant.bouy_high = dto.bouy_high;
        unitHydrant.bouy_medium = dto.bouy_medium;
        unitHydrant.flow = dto.flow;
        unitHydrant.counter = dto.counter;
        const savedUnitHydrant = await this._unitHydrantRepository.save(unitHydrant);
        unitHydrant = plainToClass(ReadUnitHydrantDto, savedUnitHydrant);
        return { unitHydrant };
    }

    async update(code: string, dto: UpdateUnitHydrantDto): Promise<UnitHydrantRO> {
        const qb = this._unitHydrantRepository.createQueryBuilder("units_hydrants")
            .leftJoinAndSelect("units_hydrants.unit", "unit")
            .where("unit.code = :code", { code });
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.size = dto.size;
        foundUnitHydrant.valve = dto.valve;
        foundUnitHydrant.bouy_alarm = dto.bouy_alarm;
        foundUnitHydrant.bouy_high = dto.bouy_high;
        foundUnitHydrant.bouy_medium = dto.bouy_medium;
        foundUnitHydrant.flow = dto.flow;
        foundUnitHydrant.unit.code = dto.code;
        foundUnitHydrant.unit.altitude = dto.altitude;
        foundUnitHydrant.unit.latitude = dto.latitude;
        foundUnitHydrant.unit.longitude = dto.longitude;
        foundUnitHydrant.unit.description = dto.description;
        const updatedUnitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
        const unitHydrant = plainToClass(ReadUnitHydrantDto, updatedUnitHydrant);
        return { unitHydrant };
    }

    async delete(code: string): Promise<UnitHydrantRO> {
        const qb = this._unitHydrantRepository.createQueryBuilder('units_hydrants');
        qb.leftJoinAndSelect("units_hydrants.unit", "unit")
        qb.where("unit.active = :active", { active: true })
        qb.andWhere("unit.code = :code", { code });
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.unit.active = false;
        const unitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
        return { unitHydrant };
    }

    async activate(code: string): Promise<UnitHydrantRO> {
        const qb = this._unitHydrantRepository.createQueryBuilder('units_hydrants');
        qb.leftJoinAndSelect("units_hydrants.unit", "unit")
        qb.where("unit.active = :active", { active: false })
        qb.andWhere("unit.code = :code", { code });
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.unit.active = true;
        const unitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
        return { unitHydrant };
    }

}
