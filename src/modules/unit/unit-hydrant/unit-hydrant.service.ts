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
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import {
  UnitHydrantRO,
  UnitsHydrantsRO,
} from './dto/unit-hydrant-response.dto';

@Injectable()
export class UnitHydrantService {
  constructor(
    @InjectRepository(UnitHydrantEntity)
    private readonly _unitHydrantRepository: Repository<UnitHydrantEntity>,
    private readonly _unitService: UnitService,
  ) {}

  // ==========================================================

  async findAll(): Promise<UnitsHydrantsRO> {
    const qb = await this._unitHydrantRepository
      .createQueryBuilder('units_hydrants')
      .leftJoinAndSelect('units_hydrants.unit', 'unit')
      .leftJoinAndSelect('unit.sector', 'sector')
      .leftJoinAndSelect('unit.station', 'station')
      .leftJoinAndSelect('unit.sets', 'sets')
      .orderBy('unit.created', 'DESC');
    const unitsHydrantsCount: number = await qb.getCount();
    const foundUnitsHydrants: UnitHydrantEntity[] = await qb.getMany();
    return { unitsHydrants: foundUnitsHydrants, count: unitsHydrantsCount };
  }

  // ==========================================================

  async findOneById(id: number): Promise<UnitHydrantRO> {
    const qb = await this._unitHydrantRepository
      .createQueryBuilder('units_hydrants')
      .leftJoinAndSelect('units_hydrants.unit', 'unit')
      .leftJoinAndSelect('unit.sector', 'sector')
      .leftJoinAndSelect('unit.station', 'station')
      .leftJoinAndSelect('unit.sets', 'sets')
      .where('units_hydrants.id = :id', { id });
    const foundUnitHydrant: UnitHydrantEntity = await qb.getOne();
    return { unitHydrant: foundUnitHydrant };
  }

  // ==========================================================

  async createOne(dto: UnitHydrantCreateDto): Promise<UnitHydrantRO> {
    const savedUnit: UnitEntity = (
      await this._unitService.create(dto.unit, UnitTypeTableEnum.UNIT_HYDRANT)
    ).unit;
    const newUnitHydrant: UnitHydrantEntity = plainToClass(
      UnitHydrantEntity,
      dto,
    );
    newUnitHydrant.unit = savedUnit;
    const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(
      newUnitHydrant,
    );
    return { unitHydrant: savedUnitHydrant };
  }

  // ==========================================================

  async updateOne(dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO> {
    let foundUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.findOne(
      dto.id,
    );
    if (!foundUnitHydrant) {
      throw new NotFoundException(UnitHydrantExceptionMSG.NOT_FOUND);
    }
    const foundUnitHydrantUnitId: UnitHydrantEntity = await this._unitHydrantRepository
      .createQueryBuilder('units_hydrants')
      .where('units_hydrants.unit.id = :id', { id: dto.unit.id })
      .getOne();
    if (foundUnitHydrantUnitId && foundUnitHydrantUnitId.id !== dto.id) {
      throw new ConflictException(UnitExceptionMSG.CONFLICT);
    }
    const updatedUnit: UnitEntity = (await this._unitService.update(dto.unit))
      .unit;
    foundUnitHydrant = plainToClass(UnitHydrantEntity, dto);
    foundUnitHydrant.unit = updatedUnit;
    const savedUnitHydrant: UnitHydrantEntity = await this._unitHydrantRepository.save(
      foundUnitHydrant,
    );
    return { unitHydrant: savedUnitHydrant };
  }
}
