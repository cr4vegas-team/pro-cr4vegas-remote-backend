import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UnitEntity } from './entity/unit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadUnitDto, CreateUnitDto, UpdateUnitDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UnitService {

    constructor(
        @InjectRepository(UnitEntity)
        private readonly _unitRepository: Repository<UnitEntity>,
    ) { }


    async getUnits(): Promise<ReadUnitDto[]> {
        const foundUnits: UnitEntity[] = await this._unitRepository.find({ where: { active: true } });

        if (foundUnits.length > 0) {
            return foundUnits.map((unit: UnitEntity) => plainToClass(ReadUnitDto, unit));
        } else {
            throw new NotFoundException();
        }
    }

    async getUnitByCode(code: string): Promise<ReadUnitDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne(code);

        if (foundUnit) {
            return plainToClass(ReadUnitDto, foundUnit);
        } else {
            throw new NotFoundException();
        }
    }

    async createUnit(dto: CreateUnitDto): Promise<ReadUnitDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne({ code: dto.code });

        if (foundUnit) {
            throw new ConflictException();
        } else {
            const unit: UnitEntity = plainToClass(UnitEntity, dto, { enableImplicitConversion: true });
            const savedUnit: UnitEntity = await this._unitRepository.save(unit);
            return plainToClass(ReadUnitDto, savedUnit);
        }
    }

    async updateUnit(code: string, dto: UpdateUnitDto): Promise<ReadUnitDto> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne({ code });

        if (foundUnit) {
            foundUnit.code = dto.code;
            foundUnit.altitude = dto.altitude;
            foundUnit.latitude = dto.latitude;
            foundUnit.longitude = dto.longitude;
            foundUnit.description = dto.description;

            const updatedUnit: UnitEntity = await this._unitRepository.save(foundUnit);
            return plainToClass(ReadUnitDto, updatedUnit);

        } else {
            throw new NotFoundException();
        }
    }

    async deleteUnit(code: string): Promise<boolean> {
        const foundUnit: UnitEntity = await this._unitRepository.findOne({ code });

        if (foundUnit) {
            foundUnit.active = false;
            const updatedUnit: UnitEntity = await this._unitRepository.save(foundUnit);
            if (updatedUnit) {
                return true;
            } else {
                return false;
            }

        } else {
            throw new NotFoundException();
        }
    }
}
