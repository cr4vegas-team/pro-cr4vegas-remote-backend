import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SensorEntity } from './sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensorService {

    constructor(
        @InjectRepository(SensorEntity)
        private readonly _sensorRepository: Repository<SensorEntity>
    ) { }

    

}
