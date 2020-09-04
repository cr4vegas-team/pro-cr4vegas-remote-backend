import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitTypeTableEnum } from '../unit/unit-type-table.enum';
import { UnitTypeEnum } from '../unit/unit-type.enum';
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
    ) {
        /* UNITS_PONDS_TEST.forEach(unitPond => {
            console.log(unitPond);
            this.createOne(unitPond);
        }); */
    }

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

    async createOne(dto: UnitPondCreateDto): Promise<UnitPondRO> {
        const foundUnitPond: UnitPondEntity = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .where('unit.code = :code', { code: dto.unit.code })
            .getOne();
        if (foundUnitPond) {
            throw new ConflictException(UnitPondExceptionMSG.CONFLICT);
        }
        const newUnitPond: UnitPondEntity = plainToClass(UnitPondEntity, dto);
        newUnitPond.unit.unitType = UnitTypeEnum.UNIT_POND;
        newUnitPond.unit.table = UnitTypeTableEnum.UNIT_POND;
        const savedUnitPond: UnitPondEntity = await this._unitPondRepository.save(newUnitPond);
        return { unitPond: savedUnitPond };
    }

    async updateOne(dto: UnitPondUpdateDto): Promise<UnitPondRO> {

        let foundUnitPond: UnitPondEntity = await this._unitPondRepository.createQueryBuilder('units_ponds')
            .leftJoinAndSelect('units_ponds.unit', 'unit')
            .where('unit.id = :id', { id: dto.unit.id })
            .orWhere('units_hydrants.id = :id', { id: dto.id })
            .getOne();
        if (!foundUnitPond) {
            throw new NotFoundException(UnitPondExceptionMSG.NOT_FOUND);
        }

        foundUnitPond = plainToClass(UnitPondEntity, dto);
        const savedUnitPond: UnitPondEntity = await this._unitPondRepository.save(foundUnitPond);
        return { unitPond: savedUnitPond };
    }
}
