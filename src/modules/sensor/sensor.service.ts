import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { MicroExceptionMSG } from '../micro/micro-exception-msg';
import { MicroEntity } from '../micro/micro.entity';
import { CreateSensorDto, ReadSensorDto, UpdateSensorDto } from './dto';
import { SensorExceptionMSG } from './sensor-excepcion-msg';
import { SensorTypeExceptionMSG } from './sensor-type/sensor-type-exception-messages';
import { SensorTypeEntity } from './sensor-type/sensor-type.entity';
import { SensorEntity } from './sensor.entity';

@Injectable()
export class SensorService {

    constructor(
        @InjectRepository(SensorEntity)
        private readonly _sensorRepository: Repository<SensorEntity>,
        @InjectRepository(MicroEntity)
        private readonly _microRepository: Repository<MicroEntity>,
        @InjectRepository(SensorTypeEntity)
        private readonly _sensorTypeRepository: Repository<SensorTypeEntity>,
    ) { }

    async getAll(id: number, rows: number): Promise<ReadSensorDto[]> {
        const foundSensors: SensorEntity[] = await this._sensorRepository.createQueryBuilder('sensors')
            .where("sensors.id > :id", { id })
            .limit(rows)
            .getMany();
        if (foundSensors.length === 0) {
            throw new NotFoundException(SensorExceptionMSG.NOT_FOUND);
        }
        return foundSensors.map((sensor: SensorEntity) => plainToClass(ReadSensorDto, sensor));
    }

    async getOneById(id: number): Promise<ReadSensorDto> {
        const foundSensor: SensorEntity = await this._sensorRepository.findOne(id, { where: { active: true } });
        if (!foundSensor) {
            throw new NotFoundException(SensorExceptionMSG.NOT_FOUND);
        }
        return plainToClass(ReadSensorDto, foundSensor);
    }

    async create(dto: CreateSensorDto): Promise<ReadSensorDto> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(dto.micro_id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(dto.sensor_id, { where: { active: true } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        const sensor: SensorEntity = plainToClass(SensorEntity, dto, { enableImplicitConversion: true });
        sensor.micro = foundMicro;
        sensor.sensor_type = foundSensorType;
        const savedSensor: SensorEntity = await this._sensorRepository.save(sensor);
        return plainToClass(ReadSensorDto, savedSensor);
    }

    async update(id: number, dto: UpdateSensorDto): Promise<ReadSensorDto> {
        const foundMicro: MicroEntity = await this._microRepository.findOne(dto.micro_id, { where: { active: true } });
        if (!foundMicro) {
            throw new NotFoundException(MicroExceptionMSG.NOT_FOUND);
        }
        const foundSensorType: SensorTypeEntity = await this._sensorTypeRepository.findOne(dto.sensor_id, { where: { active: true } });
        if (!foundSensorType) {
            throw new NotFoundException(SensorTypeExceptionMSG.NOT_FOUND);
        }
        const foundSensor: SensorEntity = await this._sensorRepository.findOne(id, { where: { active: true } });
        if (!foundSensor) {
            throw new NotFoundException(SensorExceptionMSG.NOT_FOUND);
        }
        foundSensor.micro = foundMicro;
        foundSensor.sensor_type = foundSensorType;
        foundSensor.mark = dto.mark;
        foundSensor.model = dto.model;
        foundSensor.save = dto.save;
        foundSensor.min = dto.min;
        foundSensor.max = dto.max;
        const updatedSensor: SensorEntity = await this._sensorRepository.save(foundSensor);
        return plainToClass(ReadSensorDto, updatedSensor);
    }

    async delete(ids: number[]): Promise<boolean> {
        let affected = false;
        for (let id of ids) {
            const foundSensor: SensorEntity = await this._sensorRepository.findOne(id, { where: { active: true } });
            if (foundSensor) {
                foundSensor.active = false;
                const updateResult: UpdateResult = await this._sensorRepository.update(id, foundSensor);
                if (updateResult.affected > 0) affected = true;
            }
        }
        return affected;
    }

    async activate(ids: number[]): Promise<boolean> {
        let affected = false;
        for (let id of ids) {
            const foundSensor: SensorEntity = await this._sensorRepository.findOne(id, { where: { active: false } });
            if (foundSensor) {
                foundSensor.active = true;
                const updateResult: UpdateResult = await this._sensorRepository.update(id, foundSensor);
                if (updateResult.affected > 0) affected = true;
            }
        }
        return affected;
    }
}
