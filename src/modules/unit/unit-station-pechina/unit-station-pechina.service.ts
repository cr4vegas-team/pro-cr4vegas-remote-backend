import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UnitTypeTableEnum } from '../unit/unit-type.enum';
import { UnitEntity } from '../unit/unit.entity';
import { UnitService } from '../unit/unit.service';
import { UnitCreateDto } from './../unit/dto/unit-create.dto';
import { UnitUpdateDto } from './../unit/dto/unit-update.dto';
import { UnitStationPechinaUpdateDto } from './dto/unit-station-pechina-update.dto';
import { UnitStationPechinaEntity } from './unit-station-pechina.entity';

@Injectable()
export class UnitStationPechinaService {

    constructor(
        @InjectRepository(UnitStationPechinaEntity)
        private readonly _unitStationPechinaRepository: Repository<UnitStationPechinaEntity>,
        private readonly _unitService: UnitService,
    ) {
        this.createStationPechina().then(() => {
            console.log('Iniciando estación de Pechina');
        }).catch(() => {
            console.log('La estación de Pechina ya existe...');
        });
    }

    async createStationPechina(): Promise<void> {
        const unitStationPechinaFounded = await this._unitStationPechinaRepository.findOne(1);
        if (!unitStationPechinaFounded) {
            const unitStationPechina = new UnitStationPechinaEntity();
            unitStationPechina.id = 1;
            unitStationPechina.readingBatch = 0;
            const unitDto = new UnitCreateDto();
            unitDto.code = 2;
            unitDto.active = 1;
            unitDto.name = 'Pechina';
            unitDto.description = "";
            unitDto.altitude = 98;
            unitDto.longitude = -2.446047;
            unitDto.latitude = 36.919046;
            const unit = (await this._unitService.create(unitDto, UnitTypeTableEnum.UNIT_STATION_PECHINA)).unit;
            unitStationPechina.unit = unit;
            this._unitStationPechinaRepository.save(unitStationPechina, {});
        } else {
            unitStationPechinaFounded.unit.name = 'Pechina';
            const unitUpdateDto = plainToClass(UnitUpdateDto, unitStationPechinaFounded.unit);
            await this._unitService.update(unitUpdateDto);
        }
    }

    async getStation(): Promise<UnitStationPechinaEntity> {
        const qb = await this._unitStationPechinaRepository
            .createQueryBuilder('unit_station_pechina')
            .leftJoinAndSelect('unit_station_pechina.unit', 'unit')
            .leftJoinAndSelect('unit.sector', 'sector')
            .leftJoinAndSelect('unit.sets', 'sets');
        return await qb.getOne();
    }

    async updateOne(dto: UnitStationPechinaUpdateDto): Promise<UnitStationPechinaEntity> {
        let foundUnitStationPechina = await this._unitStationPechinaRepository.findOne(
            dto.id,
        );
        const updatedUnit: UnitEntity = (await this._unitService.update(dto.unit))
            .unit;
        foundUnitStationPechina = plainToClass(UnitStationPechinaEntity, dto);
        foundUnitStationPechina.unit = updatedUnit;
        const savedUnitStationPechina: UnitStationPechinaEntity = await this._unitStationPechinaRepository.save(
            foundUnitStationPechina,
        );
        return savedUnitStationPechina;
    }
}
