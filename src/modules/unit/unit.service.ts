import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUnitDto } from './dto';
import { UnitEntity } from './unit.entity';
import { UnitRO, UnitsRO } from './unit.interfaces';
import { plainToClass } from 'class-transformer';

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
        const units = foundUnits.map((unit: UnitEntity) => plainToClass(ReadUnitDto, unit));
        return { units, unitsCount };
    }

    async getOneByCode(code: string, active?: boolean): Promise<UnitRO> {
        let foundUnit: UnitEntity = null;
        if (active !== undefined) {
            foundUnit = await this._unitRepository.findOne({ where: { code, active } });
        } else {
            foundUnit = await this._unitRepository.findOne({ where: { code } });
        }
        const unit = plainToClass(ReadUnitDto, foundUnit);
        return { unit };
    }

}
