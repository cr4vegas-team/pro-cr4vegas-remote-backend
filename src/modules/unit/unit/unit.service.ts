import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';
import { SectorService } from '../../wrap/sector/sector.service';
import { SetService } from '../../wrap/set/set.service';
import { UnitCreateDto } from './dto/unit-create.dto';
import { UnitRO, UnitsRO } from './dto/unit-response.dto';
import { UnitUpdateDto } from './dto/unit-update.dto';
import { UnitExceptionMSG } from './unit-exception-msg.enum';
import { UnitTypeTableEnum } from './unit-type.enum';
import { UnitEntity } from './unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly _unitRepository: Repository<UnitEntity>,
    @Inject(forwardRef(() => SetService))
    private readonly _setService: SetService,
    @Inject(forwardRef(() => SectorService))
    private readonly _sectorService: SectorService,
  ) { }

  // ==================================================

  async findAll(): Promise<UnitsRO> {
    const qb = await this._unitRepository.createQueryBuilder('units');
    const units: UnitEntity[] = await qb.getMany();
    const count: number = await qb.getCount();
    return { units, count };
  }

  // ==================================================

  async findAllByIds(ids: number[]): Promise<UnitsRO> {
    const qb = await this._unitRepository
      .createQueryBuilder('units')
      .whereInIds(ids);
    const units: UnitEntity[] = await qb.getMany();
    const count: number = await qb.getCount();
    return { units, count };
  }

  // ==================================================

  async findOneById(id: number): Promise<UnitRO> {
    const qb = await this._unitRepository
      .createQueryBuilder('units')
      .where('units.id = :id', { id });
    const unitFounded: UnitEntity = await qb.getOne();
    return { unit: unitFounded };
  }
  // ==================================================

  async create(
    unitCreateDto: UnitCreateDto,
    unitTypeTable: UnitTypeTableEnum,
  ): Promise<UnitRO> {
    const qb = this._unitRepository
      .createQueryBuilder('units')
      .where('units.code = :code', { code: unitCreateDto.code });

    if (unitCreateDto.unitTypeTable) {
      qb.andWhere('units.unitTypeTable = :unitType', {
        unitType: unitCreateDto.unitTypeTable,
      });
    }

    if (unitCreateDto.sector) {
      qb.andWhere('units.sector = :sectorId', {
        sectorId: unitCreateDto.sector,
      });
    }

    const foundUnitByCode: UnitEntity = await qb.getOne();

    if (foundUnitByCode) {
      throw new ConflictException(UnitExceptionMSG.CONFLICT);
    }
    const newUnit: UnitEntity = plainToClass(UnitEntity, unitCreateDto);
    newUnit.sector = (
      await this._sectorService.findOne(unitCreateDto.sector)
    ).sector;
    newUnit.sets = (
      await this._setService.findAllByIds(unitCreateDto.sets)
    ).sets;
    newUnit.unitTypeTable = unitTypeTable;
    const savedUnit: UnitEntity = await this._unitRepository.save(newUnit);
    return { unit: savedUnit };
  }

  // ==================================================

  async update(unitUpdateDto: UnitUpdateDto): Promise<UnitRO> {
    const foundUnitByCode: UnitEntity = await this._unitRepository
      .createQueryBuilder('units')
      .where('units.code = :code', { code: unitUpdateDto.code })
      .andWhere('units.unitTypeTable = :unitType', {
        unitType: unitUpdateDto.unitTypeTable,
      })
      .andWhere('units.sector = :sectorId', {
        sectorId: unitUpdateDto.sector,
      })
      .getOne();
    if (foundUnitByCode && foundUnitByCode.id !== unitUpdateDto.id) {
      throw new ConflictException(UnitExceptionMSG.CONFLICT);
    }
    let foundUnit: UnitEntity = await this._unitRepository.findOne(
      unitUpdateDto.id,
    );
    if (!foundUnit) {
      throw new NotFoundException(UnitExceptionMSG.NOT_FOUND);
    }
    foundUnit = plainToClassFromExist(foundUnit, unitUpdateDto);
    foundUnit.sets = (
      await this._setService.findAllByIds(unitUpdateDto.sets)
    ).sets;
    foundUnit.sector = (
      await this._sectorService.findOne(unitUpdateDto.sector)
    ).sector;
    const savedUnit: UnitEntity = await this._unitRepository.save(foundUnit);
    return { unit: savedUnit };
  }
}
