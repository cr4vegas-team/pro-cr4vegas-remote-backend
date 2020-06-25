

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitEntity } from '../entity/unit.entity';
import { ReadUnitHydrantDto } from './dto';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantEntity } from './entity/unit-hydrant.entity';


@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }

    async getAll(): Promise<ReadUnitHydrantDto[]> {
        const unitsHydrant = await this._unitHydrantRepository.find();
        return unitsHydrant.map((unitHydrant: UnitHydrantEntity) => plainToClass(ReadUnitHydrantDto, unitHydrant));
    }

    async getOneByCode(unit_code: string): Promise<ReadUnitHydrantDto> {
        const unitHydrant = await this._unitHydrantRepository.findOne(unit_code);
        return plainToClass(ReadUnitHydrantDto, unitHydrant);
    }

    async create(createUnitHydrantDto: CreateUnitHydrantDto): Promise<ReadUnitHydrantDto> {

        const foundUnit: UnitEntity = await this._unitRepository.findOne(createUnitHydrantDto.code);

        if (foundUnit) {
            throw new ConflictException();
        } else {
            const unit: UnitEntity = new UnitEntity();
            unit.code = createUnitHydrantDto.code;
            unit.altitude = createUnitHydrantDto.altitude;
            unit.latitude = createUnitHydrantDto.latitude;
            unit.longitude = createUnitHydrantDto.longitude;
            unit.description = createUnitHydrantDto.description;
            const savedUnit: UnitEntity = await this._unitRepository.save(unit);

            const unitHydrant: UnitHydrantEntity = new UnitHydrantEntity();
            unitHydrant.unit = savedUnit;
            unitHydrant.diameter = createUnitHydrantDto.diameter;
            unitHydrant.filter = createUnitHydrantDto.filter;
            const savedUnitHydrant = await this._unitHydrantRepository.save(unitHydrant);

            return plainToClass(ReadUnitHydrantDto, savedUnitHydrant);
        }

    }

    async update(code: string, updateUnitHydrantDto: UpdateUnitHydrantDto): Promise<ReadUnitHydrantDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne({ code: code });

        if (foundUnit) {
            foundUnit.code = updateUnitHydrantDto.code;
            foundUnit.altitude = updateUnitHydrantDto.altitude;
            foundUnit.latitude = updateUnitHydrantDto.latitude;
            foundUnit.longitude = updateUnitHydrantDto.longitude;
            foundUnit.description = updateUnitHydrantDto.description;
            const savedUnit: UnitEntity = await this._unitRepository.save(foundUnit);

            const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.findOne(savedUnit.code, { relations: ['unit'] });

            foundUnitHydrant.unit = foundUnit;
            foundUnitHydrant.diameter = updateUnitHydrantDto.diameter;
            foundUnitHydrant.filter = updateUnitHydrantDto.filter;

            const savedUnitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
            return plainToClass(ReadUnitHydrantDto, savedUnitHydrant);

        } else {
            throw new NotFoundException();
        }
    }

}
