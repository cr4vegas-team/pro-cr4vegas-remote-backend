import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitTypeTableEnum } from '../unit/unit-type-table.enum';
import { UnitTypeEnum } from '../unit/unit-type.enum';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';

@Injectable()
export class UnitHydrantService {

    constructor(
        @InjectRepository(UnitHydrantEntity)
        private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
    ) { }

    async findAll(): Promise<UnitsHydrantsRO> {

        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");

        const unitsHydrantsCount: number = await qb.getCount();

        const foundUnitsHydrants: UnitHydrantEntity[] = await qb.getMany();

        return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
    }

    async findOneById(id: number): Promise<UnitHydrantRO> {

        const qb = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_hydrants.id = :id", { id });

        const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();

        return { unitHydrant: foundUnitHydrant };
    }

    async createOne(dto: UnitHydrantCreateDto): Promise<UnitHydrantRO> {
        const foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundUnitHydrant) {
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        }
        const newUnitHydrant: UnitHydrantEntity = plainToClass(UnitHydrantEntity, dto);
        newUnitHydrant.unit.unitType = UnitTypeEnum.UNIT_HYDRANT;
        newUnitHydrant.unit.table = UnitTypeTableEnum.UNIT_HYDRANT;
        const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(newUnitHydrant);
        return { unitHydrant: savedUnitHydrant };
    }

    async updateOne(dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO> {

        /* const foundCode: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
            .leftJoinAndSelect('units_hydrants.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundCode) {
            throw new ConflictException(UnitHydrantExceptionMSG.CONFLICT);
        } */

        try {
            let foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.createQueryBuilder('units_hydrants')
                .leftJoinAndSelect('units_hydrants.unit', 'unit')
                .where('units_hydrants.id = :id', { id: dto.id })
                .andWhere('unit.id = :id', { id: dto.unit.id })
                .getOne();
            if (!foundUnitHydrant) {
                throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
            }

            foundUnitHydrant = plainToClass(UnitHydrantEntity, dto);
            const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(foundUnitHydrant);
            return { unitHydrant: savedUnitHydrant };
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }

    }

}
