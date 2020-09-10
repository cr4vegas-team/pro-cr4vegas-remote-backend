import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ExceptionMSG } from '../../../global/exception-messages';
import { UnitExceptionMSG } from '../unit/unit-exception.msg';
import { UnitTypeTableEnum } from '../unit/unit-type-table.enum';
import { UnitTypeEnum } from '../unit/unit-type.enum';
import { UnitEntity } from '../unit/unit.entity';
import { UnitService } from '../unit/unit.service';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondExceptionMSG } from './unit-pond-exception-messages';
import { UnitPondEntity } from './unit-pond.entity';
import { UnitPondRO, UnitsPondsRO } from './unit-pond.interfaces';

@Injectable()
export class UnitPondService {

    constructor(
        @InjectRepository(UnitPondEntity)
        private readonly _unitPondRepository: Repository<UnitPondEntity>,
        private readonly _unitService: UnitService,
    ) { }

    // ==========================================================
    
    async findAll(): Promise<UnitsPondsRO> {
        const qb = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .orderBy('unit.created', "DESC");
        const unitsPondsCount: number = await qb.getCount();
        const foundUnitPond: UnitPondEntity[] = await qb.getMany();
        return { unitsPonds: foundUnitPond, count: unitsPondsCount };
    }

    // ==========================================================
    
    async findOneById(id: number): Promise<UnitPondRO> {
        const qb = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.station', 'station')
            .leftJoinAndSelect('unit.sets', 'sets')
            .where("units_ponds.id = :id", { id });
        const foundUnitPond: UnitPondEntity = await qb.getOne();
        return { unitPond: foundUnitPond };
    }

    // ==========================================================

    async createOne(dto: UnitPondCreateDto): Promise<UnitPondRO> {
        const savedUnit: UnitEntity = (await this._unitService.create(dto.unit, UnitTypeEnum.UNIT_HYDRANT, UnitTypeTableEnum.UNIT_HYDRANT)).unit;
        const newUnitPond: UnitPondEntity = plainToClass(UnitPondEntity, dto);
        newUnitPond.unit = savedUnit;
        const savedUnitPond: UnitPondEntity = await this._unitPondRepository.save(newUnitPond);
        return { unitPond: savedUnitPond };
    }

    // ==========================================================
    
    async updateOne(dto: UnitPondUpdateDto): Promise<UnitPondRO> {
        let foundUnitPond: UnitPondEntity = await this._unitPondRepository.findOne(dto.id)
        if (!foundUnitPond) {
            throw new NotFoundException(UnitPondExceptionMSG.NOT_FOUND);
        }
        let foundUnitPondUnitId: UnitPondEntity = await this._unitPondRepository.createQueryBuilder('units_hydrants')
            .where('units_hydrants.unit.id = :id', { id: dto.unit.id })
            .getOne();
        if (foundUnitPondUnitId && foundUnitPondUnitId.id !== dto.id) {
            throw new ConflictException(UnitExceptionMSG.CONFLIC);
        }
        const updatedUnit: UnitEntity = (await this._unitService.update(dto.unit)).unit;
        foundUnitPond = plainToClass(UnitPondEntity, dto);
        foundUnitPond.unit = updatedUnit;
        const savedUnitPond: UnitPondEntity = await this._unitPondRepository.save(foundUnitPond);
        return { unitPond: savedUnitPond };
    }
}
