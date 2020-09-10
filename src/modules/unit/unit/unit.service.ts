import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { SectorService } from '../../wrap/sector/sector.service';
import { SetService } from '../../wrap/set/set.service';
import { StationService } from '../../wrap/station/station.service';
import { Repository, UpdateResult } from 'typeorm';
import { UnitCreateDto } from './dto/unit-create.dto';
import { UnitUpdateDto } from './dto/unit-update.dto';
import { UnitExceptionMSG } from './unit-exception.msg';
import { UnitTypeTableEnum } from './unit-type-table.enum';
import { UnitTypeEnum } from './unit-type.enum';
import { UnitEntity } from './unit.entity';
import { UnitRO, UnitsRO } from './unit.interfaces';

@Injectable()
export class UnitService {


    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
        @Inject(forwardRef(() => SetService))
        private readonly _setService: SetService,
        @Inject(forwardRef(() => SectorService))
        private readonly _sectorService: SectorService,
        @Inject(forwardRef(() => StationService))
        private readonly _stationService: StationService,
    ) { }

    async findAll(): Promise<UnitsRO> {
        const qb = await this._unitRepository.createQueryBuilder('units');
        const units: UnitEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { units, count };
    }

    async findAllByIds(ids: number[]): Promise<UnitsRO> {
        const qb = await this._unitRepository.createQueryBuilder('units')
            .whereInIds(ids);
        const units: UnitEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { units, count };
    }

    async delete(id: number): Promise<boolean> {
        const foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 0 });
        return updatedUnit.affected > 0;
    }

    async activate(id: number): Promise<boolean> {
        const foundUnit: UnitEntity = await this._unitRepository.createQueryBuilder('units')
            .where('units.id = :id', { id })
            .getOne();
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        const updatedUnit: UpdateResult = await this._unitRepository.update(id, { active: 1 });
        return updatedUnit.affected > 0;
    }

    async create(unitCreateDto: UnitCreateDto, unitType: UnitTypeEnum, unitTypeTable: UnitTypeTableEnum): Promise<UnitRO> {
        const foundUnitByCode: UnitEntity = await this._unitRepository.findOne({ where: { code: unitCreateDto.code } });
        if (foundUnitByCode) {
            throw new ConflictException(UnitExceptionMSG.CONFLIC);
        }
        const newUnit: UnitEntity = plainToClass(UnitEntity, unitCreateDto);
        newUnit.sector = (await this._sectorService.findOne(unitCreateDto.sector)).sector;
        newUnit.station = (await this._stationService.findOne(unitCreateDto.station)).station;
        newUnit.sets = (await this._setService.findAllByIds(unitCreateDto.sets)).sets;
        newUnit.unitType = unitType;
        newUnit.table = unitTypeTable;
        const savedUnit: UnitEntity = await this._unitRepository.save(newUnit);
        return { unit: savedUnit };
    }

    async update(unitUpdateDto: UnitUpdateDto): Promise<UnitRO> {
        const foundUnitByCode: UnitEntity = await this._unitRepository.findOne({ where: { code: unitUpdateDto.code } });
        if (foundUnitByCode && foundUnitByCode.id !== unitUpdateDto.id) {
            throw new ConflictException(UnitExceptionMSG.CONFLIC);
        }
        let foundUnit: UnitEntity = await this._unitRepository.findOne(unitUpdateDto.id);
        if (!foundUnit) {
            throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
        }
        foundUnit = plainToClassFromExist(foundUnit, unitUpdateDto);
        foundUnit.sets = (await this._setService.findAllByIds(unitUpdateDto.sets)).sets;
        foundUnit.sector = (await this._sectorService.findOne(unitUpdateDto.sector)).sector;
        foundUnit.station = (await this._stationService.findOne(unitUpdateDto.station)).station;
        const savedUnit: UnitEntity = await this._unitRepository.save(foundUnit);
        return { unit: savedUnit };
    }
}
