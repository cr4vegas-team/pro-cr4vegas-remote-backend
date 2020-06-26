

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, Any, UpdateResult } from 'typeorm';
import { UnitEntity } from '../unit.entity';
import { ReadUnitHydrantDto } from './dto';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitService } from '../unit.service';
import { UnitExceptionMSG } from '../unit-exception-messages';


@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(): Promise<ReadUnitHydrantDto[]> {
        const foundUnitsHydrants = await this._unitHydrantRepository.find({ where: { active: true } });
        if (foundUnitsHydrants.length === 0) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return foundUnitsHydrants.map((unitHydrant: UnitHydrantEntity) => plainToClass(ReadUnitHydrantDto, unitHydrant));
    }

    async getOneByCode(unit_code: string): Promise<ReadUnitHydrantDto> {
        const foundUnitHydrant = await this._unitHydrantRepository.findOne(unit_code, { where: { active: true } });
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        return plainToClass(ReadUnitHydrantDto, foundUnitHydrant);
    }

    async create(dto: CreateUnitHydrantDto): Promise<ReadUnitHydrantDto> {
        const foundUnit = await this._unitRepository.findOne(dto.code);
        if (foundUnit) {
            throw new ConflictException(UnitExceptionMSG.CONFLICT);
        }
        const foundUnitHydrant = await this._unitHydrantRepository.findOne(dto.code);
        if (foundUnitHydrant) {
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        }
        const unit: UnitEntity = new UnitEntity();
        unit.code = dto.code;
        unit.altitude = dto.altitude;
        unit.latitude = dto.latitude;
        unit.longitude = dto.longitude;
        unit.description = dto.description;
        const savedUnit: UnitEntity = await this._unitRepository.save(unit);

        const unitHydrant: UnitHydrantEntity = new UnitHydrantEntity();
        foundUnitHydrant.unit = savedUnit;
        foundUnitHydrant.diameter = dto.diameter;
        foundUnitHydrant.filter = dto.filter;
        const savedUnitHydrant = await this._unitHydrantRepository.save(unitHydrant);
        return plainToClass(ReadUnitHydrantDto, savedUnitHydrant);
    }

    async update(code: string, updateUnitHydrantDto: UpdateUnitHydrantDto): Promise<ReadUnitHydrantDto> {
        const foundUnit = await this._unitRepository.findOne(code, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const foundUnitHydrant = await this._unitHydrantRepository.findOne(code, { where: { active: true } });
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnit.code = updateUnitHydrantDto.code;
        foundUnit.altitude = updateUnitHydrantDto.altitude;
        foundUnit.latitude = updateUnitHydrantDto.latitude;
        foundUnit.longitude = updateUnitHydrantDto.longitude;
        foundUnit.description = updateUnitHydrantDto.description;
        const savedUnit: UnitEntity = await this._unitRepository.save(foundUnit);

        // The next line can to be necesary to find record when their PK is FK
        // const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.findOne(savedUnit.code, { relations: ['unit'] });
        foundUnitHydrant.unit = savedUnit;
        foundUnitHydrant.diameter = updateUnitHydrantDto.diameter;
        foundUnitHydrant.filter = updateUnitHydrantDto.filter;
        const savedUnitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
        return plainToClass(ReadUnitHydrantDto, savedUnitHydrant);
    }

    async delete(unit_code: string): Promise<boolean> {
        const foundUnit = await this._unitRepository.findOne(unit_code, { where: { active: true } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const foundUnitHydrant = await this._unitHydrantRepository.findOne(unit_code, { where: { active: true } });
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnit.active = false;
        foundUnitHydrant.active = false;
        const updateUnitResult: UpdateResult = await this._unitRepository.update(unit_code, foundUnit);
        const updateUnitHydrantResult: UpdateResult = await this._unitHydrantRepository.update(unit_code, foundUnitHydrant);
        return updateUnitResult.affected > 0 && updateUnitHydrantResult.affected > 0;
    }

    async activate(unit_code: string): Promise<boolean> {
        const foundUnit = await this._unitRepository.findOne(unit_code, { where: { active: false } });
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const foundUnitHydrant = await this._unitHydrantRepository.findOne(unit_code, { where: { active: false } });
        if (!foundUnitHydrant) {
            throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
        }
        foundUnit.active = true;
        foundUnitHydrant.active = true;
        const updateUnitResult: UpdateResult = await this._unitRepository.update(unit_code, foundUnit);
        const updateUnitHydrantResult: UpdateResult = await this._unitHydrantRepository.update(unit_code, foundUnitHydrant);
        return updateUnitResult.affected > 0 && updateUnitHydrantResult.affected > 0;
    }

}
