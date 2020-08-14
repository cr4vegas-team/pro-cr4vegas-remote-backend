import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNITS_HYDRANTS_TEST } from 'src/database/static_data/units-hydrants';
import { Repository, UpdateResult } from 'typeorm';
import { UnitType } from '../unit/unit-types.constant';
import { UnitEntity } from '../unit/unit.entity';
import { UnitService } from '../unit/unit.service';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantDto } from './unit-hydrant.dto';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';

@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
        private readonly _unitService: UnitService,
    ) {
        UNITS_HYDRANTS_TEST.forEach(unitHydrant => {
            this.createOne(unitHydrant);
        })

    }

    async findAll(active?: number): Promise<UnitsHydrantsRO> {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector');
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("unit.active = :active", { active });
        }
        const unitsHydrantsCount: number = await qb.getCount();
        qb.orderBy("unit.created", "DESC");
        const foundUnitsHydrants: UnitHydrantEntity[] = await qb.getMany()
        return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
    }

    async findOneByCode(code: string, active?: number): Promise<UnitHydrantRO> {
        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit');
        qb.where("units_hydrants.code = :code", { code });
        if (!isNaN(active)) {
            qb.andWhere("unit.active = :active", { active });
        }
        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
        return { unitHydrant: foundUnitHydrant };
    }

    async createOne(dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.code = :code', { code: dto.unit.code }).getOne();
        if (foundUnitHydrant) {
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        }
        const newUnit: UnitEntity = (await this._unitService.createOne(dto.unit, UnitType.HYDRANT)).unit;
        const newUnitHydrant: UnitHydrantEntity = new UnitHydrantEntity();
        newUnitHydrant.unit = newUnit;
        newUnitHydrant.code = dto.unit.code;
        newUnitHydrant.diameter = dto.diameter;
        newUnitHydrant.filter = dto.filter;
        const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }

    async updateOne(code: string, dto: UnitHydrantDto): Promise<boolean> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        const updatedUnit: boolean = await this._unitService.updateOne(foundUnitHydrant.unit.id, dto.unit);
        foundUnitHydrant.code = dto.code;
        foundUnitHydrant.diameter = dto.diameter;
        foundUnitHydrant.filter = dto.filter;

        const updateUnitHydrant: UpdateResult = await this._unitHydrantRepository.update({ code }, foundUnitHydrant);
        return updateUnitHydrant.affected > 0 && updatedUnit;
    }

    async deleteOne(code: string): Promise<boolean> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return await this._unitService.deleteOne(foundUnitHydrant.unit.id);
    }

    async activateOne(code: string): Promise<boolean> {
        console.log(code);
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('units_hydrants.code = :code', { code }).getOne();
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return await this._unitService.activateOne(foundUnitHydrant.unit.id);
    }

}
