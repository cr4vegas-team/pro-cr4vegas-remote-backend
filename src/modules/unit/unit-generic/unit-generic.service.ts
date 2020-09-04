import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitTypeTableEnum } from '../unit/unit-type-table.enum';
import { UnitTypeEnum } from '../unit/unit-type.enum';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericExceptionMSG } from './unit-generic-exception-messages';
import { UnitGenericEntity } from './unit-generic.entity';
import { UnitGenericRO, UnitsGenericsRO } from './unit-generic.interfaces';

@Injectable()
export class UnitGenericService {

    constructor(
        @InjectRepository(UnitGenericEntity)
        private readonly _unitGenericRepository: Repository<UnitGenericEntity>,
    ) { }

    async findAll(): Promise<UnitsGenericsRO> { 

        const qb = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");

        const unitsGenericsCount: number = await qb.getCount();
        const foundUnitsGenerics: UnitGenericEntity[] = await qb.getMany();
        return { unitsGenerics: foundUnitsGenerics, count: unitsGenericsCount };
    }

    async findOneById(id: number): Promise<UnitGenericRO> {

        const qb = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_generics.id = :id", { id });

        const foundUnitGeneric: UnitGenericEntity = await qb.getOne();
        return { unitGeneric: foundUnitGeneric };
    }

    async createOne(dto: UnitGenericCreateDto): Promise<UnitGenericRO> {
        const foundUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundUnitGeneric) {
            throw new ConflictException(UnitGenericExceptionMSG.CONFLICT);
        }
        const newUnitGeneric: UnitGenericEntity = plainToClass(UnitGenericEntity, dto);
        newUnitGeneric.unit.unitType = UnitTypeEnum.UNIT_GENERIC;
        newUnitGeneric.unit.table = UnitTypeTableEnum.UNIT_GENERIC;
        const savedUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.save(newUnitGeneric);
        return { unitGeneric: savedUnitGeneric };
    }

    async updateOne(dto: UnitGenericUpdateDto): Promise<UnitGenericRO> {
        let foundUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.createQueryBuilder('units_generics')
            .leftJoinAndSelect('units_generics.unit', 'unit')
            .where('unit.id = :id', { id: dto.unit.id })
            .orWhere('units_generics.id = :id', { id: dto.id })
            .getOne();
        if (!foundUnitGeneric) {
            throw new NotFoundException(UnitGenericExceptionMSG.NOT_FOUND);
        }

        foundUnitGeneric = plainToClass(UnitGenericEntity, dto);
        const savedUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.save(foundUnitGeneric);
        return { unitGeneric: savedUnitGeneric };
    }

}
