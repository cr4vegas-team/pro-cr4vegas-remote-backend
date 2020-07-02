import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { UnitExceptionMSG } from '../unit/unit-exception-messages';
import { UnitEntity } from '../unit/unit.entity';
import { CreateMicroDto, ReadMicroDto, UpdateMicroDto } from './dto';
import { MicroExceptionMSG } from './micro-exception-msg';
import { MicroEntity } from './micro.entity';
import { MicrosRO, MicroRO } from './micro.interfaces';

@Injectable()
export class MicroService {

    constructor(
        @InjectRepository(MicroEntity)
        private readonly _microRepository: Repository<MicroEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(query: any): Promise<MicrosRO> {
        const qb = this._microRepository.createQueryBuilder("micros");
        qb.where("1 = 1");
        const microsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("micros.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("micros.id > :id", { id: `${query.id}` });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        qb.orderBy("micros.created");
        const foundMicros = await qb.getMany();
        const micros = foundMicros.map(micro => plainToClass(ReadMicroDto, micro));
        return { micros, microsCount };
    }

    async getAllByUnit(unit_code: string, query): Promise<MicrosRO> {
        const qb = this._microRepository.createQueryBuilder("micros");
        qb.leftJoinAndSelect("micros.unit", "unit");
        qb.where("unit.code = :code", { code: unit_code });
        const microsCount: number = await qb.getCount();
        if ('active' in query) {
            qb.andWhere("micros.active = :active", { active: `${query.active}` });
        }
        if ('id' in query) {
            qb.andWhere("micros.id > :id", { id: query.id });
        }
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        const foundMicros = await qb.getMany();
        const micros = foundMicros.map(micro => plainToClass(ReadMicroDto, micro));
        return { micros, microsCount };
    }

    async getOneById(id: number, query: any): Promise<MicroRO> {
        if (isNaN(id)) throw new BadRequestException(MicroExceptionMSG.BAD_REQUEST);
        const qb = this._microRepository.createQueryBuilder("micros");
        qb.where("micros.id = :id", { id });
        if ('active' in query) {
            qb.andWhere("micros.active = :active", { active: `${query.active}` });
        }
        const micro = await qb.getOne();
        return { micro };
    }

    async create(dto: CreateMicroDto): Promise<MicroRO> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(dto.unit_id, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const newMicro: MicroEntity = plainToClass(MicroEntity, dto, { enableImplicitConversion: true });
        newMicro.unit = foundUnit;
        const savedMicro: MicroEntity = await this._microRepository.save(newMicro);
        const micro = plainToClass(ReadMicroDto, savedMicro);
        return { micro };
    }

    async update(id: number, dto: UpdateMicroDto, query: any): Promise<MicroRO> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(dto.unit_id, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const qb = this._microRepository.createQueryBuilder("micros");
        qb.where("micros.id = :id", { id });
        if ('active' in query) {
            qb.andWhere("micros.active = :active", { active: `${query.active}` });
        }
        const foundMicro = await qb.getOne();
        foundMicro.unit = foundUnit;
        foundMicro.communication = dto.communication;
        foundMicro.priority = dto.priority;
        foundMicro.mark = dto.mark;
        foundMicro.model = dto.model;
        foundMicro.code = dto.code;
        const updatedMicro: MicroEntity = await this._microRepository.save(foundMicro);
        const micro = plainToClass(ReadMicroDto, updatedMicro);
        return { micro };
    }

    async delete(id: number): Promise<MicroRO> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        foundMicro.active = false;
        const updateResult: MicroEntity = await this._microRepository.save(foundMicro);
        const micro = plainToClass(ReadMicroDto, updateResult);
        return { micro };
    }

    async activate(id: number): Promise<MicroRO> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: false } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        foundMicro.active = true;
        const updateResult: MicroEntity = await this._microRepository.save(foundMicro);
        const micro = plainToClass(ReadMicroDto, updateResult);
        return { micro };
    }

}
