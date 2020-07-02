import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSensorTypeDto, ReadSensorTypeDto, UpdateSensorTypeDto } from './dto';
import { SensorTypeEntity } from './sensor-type.entity';
import { SensorTypeExceptionMSG } from './sensor-type-exception-messages';

@Injectable()
export class SensorTypeService {

    constructor(
        @InjectRepository(SensorTypeEntity)
        private readonly _sensorTypeRepository: Repository<SensorTypeEntity>
    ) { }

    async getAll(id: number, rows: number): Promise<ReadSensorTypeDto[]> {
        const foundSensorTypes: SensorTypeEntity[] = await this._sensorTypeRepository.createQueryBuilder('sensors-types')
            .where("sensors-types.id > :id", { id })
            .andWhere("sensors-types.active = :active", { active: true })
            .limit(rows)
            .getMany();
        if (foundSensorTypes.length === 0) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        return foundSensorTypes.map((sensor: SensorTypeEntity) => plainToClass(ReadSensorTypeDto, sensor));
    }

    async getOneByType(id: number): Promise<ReadSensorTypeDto> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne({ where: { id, active: true } });
        return plainToClass(ReadSensorTypeDto, foundSensorType);
    }

    async create(dto: CreateSensorTypeDto): Promise<ReadSensorTypeDto> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne({ where: { name: dto.name } });
        if (foundSensorType) {
            throw new ConflictException(SensorTypeExceptionMSG.CONFLICT);
        }
        const sensorType: SensorTypeEntity = plainToClass(SensorTypeEntity, dto, { enableImplicitConversion: true });
        const savedSensorType: SensorTypeEntity = await this._sensorTypeRepository.save(sensorType);
        return plainToClass(ReadSensorTypeDto, savedSensorType);
    }

    async update(id: number, dto: UpdateSensorTypeDto): Promise<boolean> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne({ where: { id, active: true } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        foundSensorType.name = dto.name;
        const updateResult: UpdateResult = await this._sensorTypeRepository.update(name, foundSensorType);
        return updateResult.affected > 0;
    }

    async delete(ids: number[]): Promise<boolean> {
        let affected = false;
        for (let id of ids) {
            const sensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(id, { where: { active: true } });
            if (sensorType) {
                sensorType.active = false;
                const updateResult: UpdateResult = await this._sensorTypeRepository.update(id, sensorType);
                if (updateResult.affected > 0) affected = true;
            }
        }
        return affected;
    }

    async activate(ids: number[]): Promise<boolean> {
        let affected = false;
        for (let id of ids) {
            const sensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(id, { where: { active: false } });
            if (sensorType) {
                sensorType.active = true;
                const updateResult: UpdateResult = await this._sensorTypeRepository.update(id, sensorType);
                if (updateResult.affected > 0) affected = true;
            }
        }
        return affected;
    }

}
