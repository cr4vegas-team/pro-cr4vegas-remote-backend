import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UnitService } from 'src/modules/unit/unit/unit.service';
import { Repository } from 'typeorm';
import { UnitGenericEntity } from '../../unit/unit-generic/unit-generic.entity';
import { UnitHydrantEntity } from '../../unit/unit-hydrant/unit-hydrant.entity';
import { UnitPondEntity } from '../../unit/unit-pond/unit-pond.entity';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorExceptionMSG } from './sector-exception.msg';
import { SectorEntity } from './sector.entity';
import { SectorRO, SectorsRO } from './sector.interfaces';

@Injectable()
export class SectorService {

    constructor(
        @InjectRepository(SectorEntity)
        private readonly _sectorRepository: Repository<SectorEntity>,
        @Inject(forwardRef(() => UnitService))
        private readonly _unitService: UnitService,
    ) { }

    // ==========================================================
    
    async findAll(): Promise<SectorsRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors')
            .leftJoin("sectors.units", "unit")
            .leftJoinAndSelect(UnitGenericEntity, 'unit_generic', 'unit_generic.unitId = unit.id')
            .leftJoinAndSelect(UnitHydrantEntity, 'unit_hydrant', 'unit_hydrant.unitId = unit.id')
            .leftJoinAndSelect(UnitPondEntity, 'unit_pond', 'unit_pond.unitId = unit.id')
            .orderBy("sectors.created", "DESC");
        const stationsCount: number = await qb.getCount();
        const foundSectors: SectorEntity[] = await qb.getMany();
        return { sectors: foundSectors, count: stationsCount };
    }

    // ==========================================================
    
    async findOne(id: number): Promise<SectorRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors')
            .where("sectors.id = :id", { id });
        const foundSector: SectorEntity = await qb.getOne();
        return { sector: foundSector };
    }

    // ==========================================================
    
    async findOneWithUnits(id: number): Promise<SectorRO> {
        const qb = await this._sectorRepository.createQueryBuilder('sectors')
            .leftJoinAndSelect("sectors.units", "units")
            .where("sectors.id = :id", { id });
        const foundSector: SectorEntity = await qb.getOne();
        return { sector: foundSector };
    }

    // ==========================================================
    
    async createOne(dto: SectorCreateDto): Promise<SectorRO> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.code = :code', { code: dto.code })
            .orWhere('sectors.name = :name', { name: dto.name })
            .getOne();
        if (foundSector) {
            throw new ConflictException(SectorExceptionMSG.CONFLICT);
        }
        const newSector: SectorEntity = plainToClass(SectorEntity, dto);
        newSector.units = (await this._unitService.findAllByIds(dto.units)).units;
        const savedSector: SectorEntity = await this._sectorRepository.save(newSector);
        return { sector: savedSector };
    }

    // ==========================================================
    
    async updateOne(dto: SectorUpdateDto): Promise<SectorRO> {
        let foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id: dto.id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        foundSector = plainToClass(SectorEntity, dto);
        foundSector.units = (await this._unitService.findAllByIds(dto.units)).units;
        const updatedSector: SectorEntity = await this._sectorRepository.save(foundSector);
        return { sector: updatedSector };
    }

    // ==========================================================
    
    async deleteOne(id: number): Promise<boolean> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        return (await this._sectorRepository.update(id, { active: 0 })).affected > 0;
    }

    // ==========================================================
    
    async activateOne(id: number): Promise<boolean> {
        const foundSector: SectorEntity = await this._sectorRepository.createQueryBuilder('sectors')
            .where('sectors.id = :id', { id })
            .getOne();
        if (!foundSector) {
            throw new NotFoundException(SectorExceptionMSG.NOT_FOUND_ID);
        }
        return (await this._sectorRepository.update(id, { active: 1 })).affected > 0;
    }

}
