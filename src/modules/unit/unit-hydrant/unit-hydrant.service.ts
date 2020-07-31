import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitType } from '../unit/unit-types.constant';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitEntity } from '../unit/unit.entity';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitService } from '../unit/unit.service';
import { UnitHydrantDto } from './unit-hydrant.dto';
import { UnitDto } from '../unit/unit.dto';
import { UnitExceptionMSG } from '../unit/unit-exception.msg';

@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
        private readonly _unitService: UnitService,
    ) { }

    async findAll(query): Promise<UnitsHydrantsRO> {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit');
        qb.where("1 = 1");
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
        const foundUnitsHydrants: UnitHydrantEntity[] = await qb.getMany()
        return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
    }

    async findOneById(query): Promise<UnitHydrantRO> {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("units.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("units_hydrants.id = :id", { id: `${query.id}` });
        }
        if ('code' in query) {
            qb.andWhere("units_hydrants.code = :code", { code: `${query.code}` });
        }
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        return { unitHydrant: foundUnitHydrant };
    }

    async createOne(dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.code = :code', { code: dto.code }).getOne();
        if (foundUnitHydrant) {
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        }
        let unitDto: UnitDto = new UnitDto();
        unitDto.altitude = dto.altitude;
        unitDto.longitude = dto.longitude;
        unitDto.latitude = dto.latitude;
        unitDto.unitType = dto.unitType;
        unitDto.description = dto.description;
        const savedUnit: UnitEntity = (await this._unitService.createOne(unitDto)).unit;
        let newUnitHydrant: UnitHydrantEntity = new UnitHydrantEntity();
        newUnitHydrant.unit = savedUnit;
        newUnitHydrant.code = dto.code;
        newUnitHydrant.diameter = dto.diameter;
        newUnitHydrant.filter = dto.filter > 0 ? true : false;
        const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }

    async updateOne(id: number, dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.id = :id', { id }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.code = dto.code;
        foundUnitHydrant.diameter = dto.diameter;
        foundUnitHydrant.filter = dto.filter > 0 ? true : false;
        foundUnitHydrant.unit.altitude = dto.altitude;
        foundUnitHydrant.unit.latitude = dto.latitude;
        foundUnitHydrant.unit.longitude = dto.longitude;
        foundUnitHydrant.unit.description = dto.description;
        foundUnitHydrant.unit.unitType = UnitType[dto.unitType];
        let updateUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(foundUnitHydrant);
        return { unitHydrant: updateUnitHydrant };
    }

    async deleteOne(id: number): Promise<Boolean> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.id = :id', { id }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.unit.active = false;
        return await this._unitService.deleteOne(foundUnitHydrant.unit.id);
    }

    async activateOne(id: number): Promise<Boolean> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.id = :id', { id }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        if (!foundUnitHydrant.unit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        foundUnitHydrant.unit.active = true;
        return await this._unitService.deleteOne(foundUnitHydrant.unit.id);
    }

}
