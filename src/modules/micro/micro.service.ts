import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { UnitExceptionMSG } from '../unit/unit-exception-messages';
import { UnitEntity } from '../unit/unit.entity';
import { CreateMicroDto, ReadMicroDto, UpdateMicroDto } from './dto';
import { MicroExceptionMSG } from './micro-exception-msg';
import { MicroEntity } from './micro.entity';

@Injectable()
export class MicroService {

    constructor(
        @InjectRepository(MicroEntity)
        private readonly _microRepository: Repository<MicroEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(): Promise<ReadMicroDto[]> {
        const foundMicros: MicroEntity[] = await this._microRepository.find({ where: { active: true } });
        if (foundMicros.length === 0) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        return foundMicros.map((micro: MicroEntity) => plainToClass(ReadMicroDto, micro));
    }

    async getAllByUnit(unit_code: string): Promise<ReadMicroDto[]> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(unit_code);
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const foundMicro: MicroEntity[] = await this._microRepository.find({ where: { unit: foundUnit, active: true } });
        return foundMicro.map((micro: MicroEntity) => plainToClass(ReadMicroDto, micro));
    }

    async getOneById(id: number): Promise<ReadMicroDto> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        return plainToClass(ReadMicroDto, foundMicro);
    }

    async create(dto: CreateMicroDto): Promise<ReadMicroDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(dto.unit_code, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const micro: MicroEntity = plainToClass(MicroEntity, dto, { enableImplicitConversion: true });
        micro.unit = foundUnit;
        const savedMicro: MicroEntity = await this._microRepository.save(micro);
        return plainToClass(ReadMicroDto, savedMicro);
    }

    async update(id: number, dto: UpdateMicroDto): Promise<ReadMicroDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(dto.unit_code, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        foundMicro.unit = foundUnit;
        foundMicro.communication = dto.communication;
        foundMicro.priority = dto.priority;
        foundMicro.mark = dto.mark;
        foundMicro.model = dto.model;
        foundMicro.code = dto.code;
        const updatedMicro: MicroEntity = await this._microRepository.save(foundMicro);
        return plainToClass(ReadMicroDto, updatedMicro);
    }

    async delete(id: number): Promise<boolean> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        foundMicro.active = false;
        const updateResult: UpdateResult = await this._microRepository.update(id, foundMicro);
        return updateResult.affected > 0;
    }

    async activate(id: number): Promise<boolean> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(id, { where: { active: false } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        foundMicro.active = true;
        const updateResult: UpdateResult = await this._microRepository.update(id, foundMicro);
        return updateResult.affected > 0;
    }

}
