

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async findAll(): Promise<ReadUnitHydrantDto[]> {
        const unitsHydrant = await this._unitHydrantRepository.find();
        return unitsHydrant.map((unitHydrant: UnitHydrantEntity) => plainToClass(ReadUnitHydrantDto, unitHydrant));
    }

    async findOne(code: string): Promise<ReadUnitHydrantDto> {
        const unitHydrant = await this._unitHydrantRepository.findOne(code);
        return plainToClass(ReadUnitHydrantDto, unitHydrant);
    }

    async create(createUnitHydrantDto: CreateUnitHydrantDto): Promise<ReadUnitHydrantDto> {
        if (createUnitHydrantDto) {
            let unitHydrant = new UnitHydrantEntity();
            unitHydrant.unit = plainToClass(UnitEntity, createUnitHydrantDto.unit);
            unitHydrant.diameter = createUnitHydrantDto.diameter;
            unitHydrant.filter = createUnitHydrantDto.filter;

            const unitHydrantExist = await this._unitHydrantRepository.findOne(createUnitHydrantDto.code);

            if (await unitHydrantExist) {
                throw new ConflictException();
            }
            const newUnitHydrant = await this._unitHydrantRepository.save(unitHydrant);
            return plainToClass(ReadUnitHydrantDto, newUnitHydrant);
        } else {
            throw new BadRequestException();
        }
    }

    async update(code: string, updateUnitHydrantDto: UpdateUnitHydrantDto): Promise<ReadUnitHydrantDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne({ code });
        if (foundUnit) {
            const foundUnitHydrant = await this._unitHydrantRepository.findOne({ unit: foundUnit });
            if (foundUnitHydrant) {
                foundUnitHydrant.unit = plainToClass(UnitEntity, updateUnitHydrantDto.unit);
                foundUnitHydrant.diameter = updateUnitHydrantDto.diameter;
                foundUnitHydrant.filter = updateUnitHydrantDto.filter;

                const unitHydrant = await this._unitHydrantRepository.save(foundUnitHydrant);
                return plainToClass(ReadUnitHydrantDto, unitHydrant);
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new BadRequestException();
        }
    }

}
