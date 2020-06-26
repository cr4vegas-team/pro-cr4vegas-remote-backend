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

    async getAll(): Promise<ReadSensorTypeDto[]> {
        const foundSensorTypes: SensorTypeEntity[] = await this._sensorTypeRepository.find({ where: { active: true } });
        if (foundSensorTypes.length === 0) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        return foundSensorTypes.map((sensor: SensorTypeEntity) => plainToClass(ReadSensorTypeDto, sensor));
    }

    async getOneByType(type: string): Promise<ReadSensorTypeDto> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(type, { where: { active: true } });
        return plainToClass(ReadSensorTypeDto, foundSensorType);
    }

    async create(dto: CreateSensorTypeDto): Promise<ReadSensorTypeDto> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(dto.type);
        if (foundSensorType) {
            throw new ConflictException(SensorTypeExceptionMSG.CONFLICT);
        }
        const sensorType: SensorTypeEntity = plainToClass(SensorTypeEntity, dto, { enableImplicitConversion: true });
        const savedSensorType: SensorTypeEntity = await this._sensorTypeRepository.save(sensorType);
        return plainToClass(ReadSensorTypeDto, savedSensorType);
    }

    async update(type: string, dto: UpdateSensorTypeDto): Promise<boolean> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(type, { where: { active: true } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        foundSensorType.type = dto.type;
        const updateResult: UpdateResult = await this._sensorTypeRepository.update(type, foundSensorType);
        return updateResult.affected > 0;
    }

    async delete(type: string): Promise<boolean> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(type, { where: { active: true } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        foundSensorType.active = false;
        const updateResult: UpdateResult = await this._sensorTypeRepository.update(type, foundSensorType);
        return updateResult.affected > 0;
    }

    async activate(type: string): Promise<boolean> {
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(type, { where: { active: false } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        foundSensorType.active = true;
        const updateResult: UpdateResult = await this._sensorTypeRepository.update(type, foundSensorType);
        return updateResult.affected > 0;
    }

}
