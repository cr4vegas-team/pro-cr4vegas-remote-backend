import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { UnitTypeTableEnum } from '../unit/unit-type.enum';
import { UnitEntity } from '../unit/unit.entity';
import { UnitService } from '../unit/unit.service';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericExceptionMSG } from './unit-generic-exception-messages';
import { UnitGenericEntity } from './unit-generic.entity';
import {
  UnitGenericRO,
  UnitsGenericsRO,
} from './dto/unit-generic-response.dto';

@Injectable()
export class UnitGenericService {
  constructor(
    @InjectRepository(UnitGenericEntity)
    private readonly _unitGenericRepository: Repository<UnitGenericEntity>,
    private readonly _unitService: UnitService,
  ) {}

  // ==========================================================

  async findAll(): Promise<UnitsGenericsRO> {
    const qb = await this._unitGenericRepository
      .createQueryBuilder('units_generics')
      .leftJoinAndSelect('units_generics.unit', 'unit')
      .leftJoinAndSelect('unit.sector', 'sector')
      .leftJoinAndSelect('unit.station', 'station')
      .leftJoinAndSelect('unit.sets', 'sets')
      .orderBy('unit.created', 'DESC');

    const unitsGenericsCount: number = await qb.getCount();
    const foundUnitsGenerics: UnitGenericEntity[] = await qb.getMany();
    return { unitsGenerics: foundUnitsGenerics, count: unitsGenericsCount };
  }

  // ==========================================================

  async findOneById(id: number): Promise<UnitGenericRO> {
    const qb = await this._unitGenericRepository
      .createQueryBuilder('units_generics')
      .leftJoinAndSelect('units_generics.unit', 'unit')
      .leftJoinAndSelect('unit.sector', 'sector')
      .leftJoinAndSelect('unit.station', 'station')
      .leftJoinAndSelect('unit.sets', 'sets')
      .where('units_generics.id = :id', { id });

    const foundUnitGeneric: UnitGenericEntity = await qb.getOne();
    return { unitGeneric: foundUnitGeneric };
  }

  // ==========================================================

  async create(dto: UnitGenericCreateDto): Promise<UnitGenericRO> {
    const savedUnit: UnitEntity = (
      await this._unitService.create(dto.unit, UnitTypeTableEnum.UNIT_GENERIC)
    ).unit;
    const newUnitGeneric: UnitGenericEntity = plainToClass(
      UnitGenericEntity,
      dto,
    );
    newUnitGeneric.unit = savedUnit;
    const savedUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.save(
      newUnitGeneric,
    );

    return { unitGeneric: savedUnitGeneric };
  }

  // ==========================================================

  async update(dto: UnitGenericUpdateDto): Promise<UnitGenericRO> {
    let foundUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.findOne(
      dto.id,
    );
    if (!foundUnitGeneric) {
      throw new NotFoundException(UnitGenericExceptionMSG.NOT_FOUND);
    }
    const foundUnitGenericUnitId: UnitGenericEntity = await this._unitGenericRepository
      .createQueryBuilder('units_generics')
      .where('units_generics.unit.id = :id', { id: dto.unit.id })
      .getOne();
    if (foundUnitGenericUnitId && foundUnitGenericUnitId.id !== dto.id) {
      throw new ConflictException(UnitExceptionMSG.CONFLICT);
    }
    const updatedUnit: UnitEntity = (await this._unitService.update(dto.unit))
      .unit;
    foundUnitGeneric = plainToClass(UnitGenericEntity, dto);
    foundUnitGeneric.unit = updatedUnit;
    const savedUnitGeneric: UnitGenericEntity = await this._unitGenericRepository.save(
      foundUnitGeneric,
    );
    return { unitGeneric: savedUnitGeneric };
  }
}
