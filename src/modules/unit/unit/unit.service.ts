import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UnitExceptionMSG } from './unit-exception.msg';
import { UnitEntity } from './unit.entity';

@Injectable()
export class UnitService {

    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async delete(id: number): Promise<boolean> {

        const foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }

        const updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 0 });

        return updatedUnit.affected > 0;
    }

    async activate(id: number): Promise<boolean> {

        const foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }

        const updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 1 });

        return updatedUnit.affected > 0;
    }
}
