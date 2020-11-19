import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitService } from '../../unit/unit/unit.service';
import { SetCreateDto } from './dto/set-create.dto';
import { SetRO, SetsRO } from './dto/set-response.dto';
import { SetTypeUpdateDto } from './dto/set-type-update.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetExceptionMSG } from './set-exception.msg';
import { SetTypeEntity } from './set-type.entity';
import { SetEntity } from './set.entity';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(SetEntity)
    private readonly _setRepository: Repository<SetEntity>,
    @InjectRepository(SetTypeEntity)
    private readonly _setTypeRepository: Repository<SetTypeEntity>,
    @Inject(forwardRef(() => UnitService))
    private readonly _unitService: UnitService,
  ) {}

  // ==================================================

  async findAll(): Promise<SetsRO> {
    const qb = await this._setRepository
      .createQueryBuilder('sets')
      .leftJoinAndSelect('sets.units', 'units')
      .leftJoinAndSelect('sets.setType', 'setType')
      .orderBy('sets.created', 'DESC');

    const setsCount: number = await qb.getCount();
    const foundSets: SetEntity[] = await qb.getMany();
    return { sets: foundSets, count: setsCount };
  }

  // ==================================================

  async findAllByIds(ids: number[]): Promise<SetsRO> {
    const qb = await this._setRepository
      .createQueryBuilder('sets')
      .leftJoinAndSelect('sets.setType', 'setType')
      .whereInIds(ids);

    const sets: SetEntity[] = await qb.getMany();
    const count: number = await qb.getCount();
    return { sets, count };
  }

  // ==================================================

  async findOne(id: number): Promise<SetRO> {
    const qb = await this._setRepository
      .createQueryBuilder('sets')
      .leftJoinAndSelect('sets.setType', 'setType')
      .where('sets.id = :id', { id });

    const foundSet: SetEntity = await qb.getOne();
    return { set: foundSet };
  }

  // ==================================================

  async findOneWithUnits(id: number): Promise<SetRO> {
    const qb = await this._setRepository
      .createQueryBuilder('sets')
      .leftJoinAndSelect('sets.units', 'units')
      .leftJoinAndSelect('sets.setType', 'setType')
      .where('sets.id = :id', { id });

    const foundSet: SetEntity = await qb.getOne();
    return { set: foundSet };
  }

  // ==================================================

  async createOne(dto: SetCreateDto): Promise<SetRO> {
    const foundSet: SetEntity = await this._setRepository
      .createQueryBuilder('sets')
      .where('sets.code = :code', { code: dto.code })
      .orWhere('sets.name = :name', { name: dto.name })
      .getOne();
    if (foundSet) {
      if (foundSet.name === dto.name) {
        throw new ConflictException(SetExceptionMSG.CONFLICT_NAME);
      }
      throw new ConflictException(SetExceptionMSG.CONFLICT_CODE);
    }
    const newSet: SetEntity = plainToClass(SetEntity, dto);
    newSet.units = (await this._unitService.findAllByIds(dto.units)).units;
    newSet.setType = await this._setTypeRepository.findOne({
      where: { name: dto.setType },
    });
    const savedStation: SetEntity = await this._setRepository.save(newSet);
    console.log(savedStation);
    return { set: savedStation };
  }

  // ==================================================

  async updateOne(dto: SetUpdateDto): Promise<SetRO> {
    const foundSetConflict: SetEntity = await this._setRepository
      .createQueryBuilder('sets')
      .where('sets.code = :code', { code: dto.code })
      .orWhere('sets.name = :name', { name: dto.name })
      .getOne();
    if (foundSetConflict && foundSetConflict.id !== dto.id) {
      if (foundSetConflict.name === dto.name) {
        throw new ConflictException(SetExceptionMSG.CONFLICT_NAME);
      }
      throw new ConflictException(SetExceptionMSG.CONFLICT_CODE);
    }
    let foundSet: SetEntity = await this._setRepository
      .createQueryBuilder('sets')
      .where('sets.id = :id', { id: dto.id })
      .getOne();
    if (!foundSet) {
      throw new NotFoundException(SetExceptionMSG.NOT_FOUND);
    }
    foundSet = plainToClass(SetEntity, dto);
    foundSet.units = (await this._unitService.findAllByIds(dto.units)).units;
    foundSet.setType = await this._setTypeRepository.findOne({
      where: { name: dto.setType },
    });
    const updatedSet: SetEntity = await this._setRepository.save(foundSet);
    return { set: updatedSet };
  }

  // ==================================================

  async findAllSetTypes(): Promise<SetTypeEntity[]> {
    const foundSetsTypes: SetTypeEntity[] = await this._setTypeRepository
      .createQueryBuilder('sets_types')
      .getMany();
    return foundSetsTypes;
  }

  // ==================================================

  async insertSetType(setType: SetTypeEntity): Promise<SetTypeEntity> {
    const foundSetType: SetTypeEntity = await this._setTypeRepository
      .createQueryBuilder('sets_types')
      .where('sets_types.name = :name', { name: setType.name })
      .getOne();
    if (foundSetType) {
      throw new ConflictException(SetExceptionMSG.CONFLICT_TYPE);
    }
    return await this._setTypeRepository.save(setType);
  }

  // ==================================================

  async updateSetType(dto: SetTypeUpdateDto): Promise<SetTypeEntity> {
    const foundSetType: SetTypeEntity = await this._setTypeRepository
      .createQueryBuilder('sets_types')
      .where('sets_types.name = :name', { name: dto.oldName })
      .getOne();
    if (!foundSetType) {
      throw new NotFoundException(SetExceptionMSG.NOT_FOUND_TYPE);
    }
    foundSetType.name = dto.newName;
    return await this._setTypeRepository.save(foundSetType);
  }

  // ==================================================

  async deleteSetType(name: string): Promise<boolean> {
    console.log('setType: ' + name);
    const foundSetType: SetTypeEntity = await this._setTypeRepository
      .createQueryBuilder('sets_types')
      .where('sets_types.name = :name', { name })
      .getOne();
    if (!foundSetType) {
      throw new NotFoundException(SetExceptionMSG.NOT_FOUND_TYPE);
    }
    const foundSet: SetEntity = await this._setRepository
      .createQueryBuilder('sets')
      .where('sets.setType = :name', { name })
      .getOne();
    if (foundSet) {
      throw new BadRequestException(SetExceptionMSG.SET_TYPE_LINKED);
    }
    return (await this._setTypeRepository.delete(name)).affected > 0;
  }
}
