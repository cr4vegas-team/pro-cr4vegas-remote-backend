import {
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
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorRO, SectorsRO } from './dto/sector-response.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorExceptionMSG } from './sector-exception.msg';
import { SectorEntity } from './sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(SectorEntity)
    private readonly _sectorRepository: Repository<SectorEntity>,
    @Inject(forwardRef(() => UnitService))
    private readonly _unitService: UnitService,
  ) {}

  // ==========================================================

  async findAll(): Promise<SectorsRO> {
    const qb = await this._sectorRepository
      .createQueryBuilder('sectors')
      .leftJoinAndSelect('sectors.units', 'units')
      .orderBy('sectors.created', 'DESC');

    const stationsCount: number = await qb.getCount();
    const foundSectors: SectorEntity[] = await qb.getMany();
    return { sectors: foundSectors, count: stationsCount };
  }

  // ==========================================================

  async findOne(id: number): Promise<SectorRO> {
    const qb = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.id = :id', { id });
    const foundSector: SectorEntity = await qb.getOne();
    return { sector: foundSector };
  }

  // ==========================================================

  async findOneWithUnits(id: number): Promise<SectorRO> {
    const qb = await this._sectorRepository
      .createQueryBuilder('sectors')
      .leftJoinAndSelect('sectors.units', 'units')
      .where('sectors.id = :id', { id });
    const foundSector: SectorEntity = await qb.getOne();
    return { sector: foundSector };
  }

  // ==========================================================

  async createOne(dto: SectorCreateDto): Promise<SectorRO> {
    const foundSector: SectorEntity = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.code = :code', { code: dto.code })
      .orWhere('sectors.name = :name', { name: dto.name })
      .getOne();
    if (foundSector) {
      if (foundSector.name === dto.name) {
        throw new ConflictException(SectorExceptionMSG.CONFLICT_NAME);
      }
      if (foundSector.code === dto.code) {
        throw new ConflictException(SectorExceptionMSG.CONFLICT_CODE);
      }
    }
    const newSector: SectorEntity = plainToClass(SectorEntity, dto);
    newSector.units = (await this._unitService.findAllByIds(dto.units)).units;
    const savedSector: SectorEntity = await this._sectorRepository.save(
      newSector,
    );
    return { sector: savedSector };
  }

  // ==========================================================

  async updateOne(dto: SectorUpdateDto): Promise<SectorRO> {
    const foundSectorConflict: SectorEntity = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.code = :code', { code: dto.code })
      .orWhere('sectors.name = :name', { name: dto.name })
      .getOne();
    if (foundSectorConflict && foundSectorConflict.id !== dto.id) {
      if (foundSectorConflict.name === dto.name) {
        throw new ConflictException(SectorExceptionMSG.CONFLICT_NAME);
      }
      if (foundSectorConflict.code === dto.code) {
        throw new ConflictException(SectorExceptionMSG.CONFLICT_CODE);
      }
    }
    let foundSector: SectorEntity = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.id = :id', { id: dto.id })
      .getOne();
    if (!foundSector) {
      throw new NotFoundException(SectorExceptionMSG.NOT_FOUND);
    }
    foundSector = plainToClass(SectorEntity, dto);
    foundSector.units = (await this._unitService.findAllByIds(dto.units)).units;
    const updatedSector: SectorEntity = await this._sectorRepository.save(
      foundSector,
    );
    return { sector: updatedSector };
  }

  // ==========================================================

  async deleteOne(id: number): Promise<boolean> {
    const foundSector: SectorEntity = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.id = :id', { id })
      .getOne();
    if (!foundSector) {
      throw new NotFoundException(SectorExceptionMSG.NOT_FOUND);
    }
    return (
      (await this._sectorRepository.update(id, { active: 0 })).affected > 0
    );
  }

  // ==========================================================

  async activateOne(id: number): Promise<boolean> {
    const foundSector: SectorEntity = await this._sectorRepository
      .createQueryBuilder('sectors')
      .where('sectors.id = :id', { id })
      .getOne();
    if (!foundSector) {
      throw new NotFoundException(SectorExceptionMSG.NOT_FOUND);
    }
    return (
      (await this._sectorRepository.update(id, { active: 1 })).affected > 0
    );
  }
}
