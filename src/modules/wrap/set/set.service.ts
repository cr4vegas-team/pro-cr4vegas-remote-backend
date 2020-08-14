import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SetDto } from '../set/set.dto';
import { SetExceptionMSG } from './set-exception.msg';
import { SetEntity } from './set.entity';
import { SetRO, SetsRO } from './set.interfaces';

@Injectable()
export class SetService {

    constructor(
        @InjectRepository(SetEntity)
        private readonly _setRepository: Repository<SetEntity>
    ) { }

    async findAll(active?: number): Promise<SetsRO> {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.leftJoinAndSelect("sets.units", "units");
        qb.leftJoinAndSelect('sets.setType', 'setType');
        qb.where("1 = 1");
        if (!isNaN(active)) {
            qb.andWhere("sets.active = :active", { active });
        }
        const setsCount: number = await qb.getCount();
        qb.orderBy("sets.created", "DESC");
        const foundStations: SetEntity[] = await qb.getMany();
        return { sets: foundStations, count: setsCount };
    }

    async findOne(id: number, active?: number): Promise<SetRO> {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.leftJoinAndSelect("sets.units", "units");
        qb.leftJoinAndSelect('sets.setType', 'setType');
        qb.where("sets.id = :id", { id });
        if (!isNaN(active)) {
            qb.andWhere("sets.active = :active", { active });
        }
        const foundSet: SetEntity = await qb.getOne();
        return { set: foundSet };
    }

    async createOne(dto: SetDto): Promise<SetRO> {
        const newStation: SetEntity = new SetEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        const savedStation: SetEntity = await this._setRepository.save(newStation);
        return { set: savedStation };
    }

    async updateOne(id: number, dto: SetDto): Promise<boolean> {
        const foundSet: SetEntity = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        foundSet.code = dto.code;
        foundSet.name = dto.name;
        foundSet.description = dto.description;
        const updatedStation: SetEntity = await this._setRepository.save(foundSet);
        return updatedStation ? true : false;
    }

    async deleteOne(id: number): Promise<boolean> {
        const foundSet: SetEntity = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        const updatedStation: UpdateResult = await this._setRepository.update(id, { active: false });
        return updatedStation.affected > 0;
    }

    async activateOne(id: number): Promise<boolean> {
        const foundSet: SetEntity = await this._setRepository.createQueryBuilder('sets')
            .where("sets.id = :id", { id })
            .getOne();
        if (!foundSet) {
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        const updatedUnit: UpdateResult = await this._setRepository.update(id, { active: true });
        return updatedUnit.affected > 0;
    }

}
