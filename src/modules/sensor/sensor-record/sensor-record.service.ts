import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorRecordEntity } from './sensor-record.entity';
import { Repository } from 'typeorm';
import { SensorEntity } from '../sensor.entity';
import { ReadSensorRecordDto, CreateSensorRecordDto } from './dto';
import { plainToClass } from 'class-transformer';
import { SensorRecordExceptionMSG } from './sensor-record-exception-messages';

@Injectable()
export class SensorRecordService {

    constructor(
        @InjectRepository(SensorRecordEntity)
        private readonly _sensorRecordRepository: Repository<SensorRecordEntity>,
        @InjectRepository(SensorEntity)
        private readonly _sensorRepository: Repository<SensorEntity>,
    ) { }

    async getAll(id: number, rows: number): Promise<ReadSensorRecordDto[]> {
        const foundSensorsRecords: SensorRecordEntity[] = await this._sensorRecordRepository.createQueryBuilder('sensors_records')
            .where("sensors.id = :id", { id })
            .limit(rows)
            .getMany();
        return foundSensorsRecords.map((sensorRecord: SensorRecordEntity) => plainToClass(ReadSensorRecordDto, sensorRecord));
    }

    async getAllBySensorId(sensor_id: number): Promise<ReadSensorRecordDto[]> {
        const foundSensorsRecords: SensorRecordEntity[] = await this._sensorRecordRepository.createQueryBuilder('sensors_records')
            .where("sensors.sensor_id = :sensor_id", { sensor_id })
            .getMany();
        return foundSensorsRecords.map((sensorRecord: SensorRecordEntity) => plainToClass(ReadSensorRecordDto, sensorRecord));
    }

    async create(dto: CreateSensorRecordDto): Promise<ReadSensorRecordDto> {
        const sensorRecord: SensorRecordEntity = plainToClass(SensorRecordEntity, dto);
        const foundSensor: SensorEntity = await this._sensorRepository.findOne(dto.sensor_id);
        if (!foundSensor) {
            throw new NotFoundException(SensorRecordExceptionMSG.NOT_FOUND);
        }
        sensorRecord.sensor = foundSensor;
        const savedSensorRecord: SensorRecordEntity = await this._sensorRecordRepository.save(sensorRecord);
        return plainToClass(ReadSensorRecordDto, savedSensorRecord);
    }

}
