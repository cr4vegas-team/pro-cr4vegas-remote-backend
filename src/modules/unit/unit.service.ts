import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UnitEntity } from './unit.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUnitDto, CreateUnitDto, UpdateUnitDto } from './dto';
import { plainToClass } from 'class-transformer';
import { UnitExceptionMSG } from './unit-exception-messages';

@Injectable()
export class UnitService {

    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(): Promise<ReadUnitDto[]> {
        const foundUnits: UnitEntity[] = await this._unitRepository.find({ where: { active: true } });
        if (foundUnits.length === 0) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        return foundUnits.map((unit: UnitEntity) => plainToClass(ReadUnitDto, unit));
    }

    async getOneByCode(code: string): Promise<ReadUnitDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(code, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        return plainToClass(ReadUnitDto, foundUnit);
    }

}
