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

    async findAll(query): Promise<SetsRO> {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.leftJoinAndSelect('sets.setType', 'setType');
        qb.where("1 = 1");
        const setsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("sets.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("sets.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("sets.created", "DESC");
        const foundStations: SetEntity[] = await qb.getMany();
        return { sets: foundStations, count: setsCount };
    }

    async findOne(query): Promise<SetRO> {
        const qb = await this._setRepository.createQueryBuilder('sets');
        qb.where("1 = 1");
        if ('active' in query) {
            qb.andWhere("sets.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("sets.id = :id", { id: `${query.id}` });
        }
        const foundStation: SetEntity = await qb.getOne();
        return { set: foundStation };
    }

    async createOne(dto: SetDto): Promise<SetRO> {
        let newStation: SetEntity = new SetEntity();
        newStation.code = dto.code;
        newStation.name = dto.name;
        newStation.description = dto.description;
        let savedStation: SetEntity = await this._setRepository.save(newStation);
        return { set: savedStation };
    }

    async updateOne(id: number, dto: SetDto): Promise<SetRO> {
        let foundStation: SetEntity = await this._setRepository.findOne(id);
        if (!foundStation) {
            console.log(id);
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        foundStation.code = dto.code;
        foundStation.name = dto.name;
        foundStation.description = dto.description;
        let updatedStation: SetEntity = await this._setRepository.save(foundStation);
        return { set: updatedStation };
    }

    async deleteOne(id: number): Promise<Boolean> {
        let foundStation: SetEntity = await this._setRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        let updatedStation: UpdateResult = await this._setRepository.update(id, { active: false });
        return updatedStation.affected > 0;
    }

    async activateOne(id: number): Promise<Boolean> {
        let foundStation: SetEntity = await this._setRepository.findOne(id);
        if (!foundStation) {
            throw new NotFoundException(SetExceptionMSG.NOT_FOUND_ID);
        }
        let updatedUnit: UpdateResult = await this._setRepository.update(id, { active: true });
        return updatedUnit.affected > 0;
    }

}
