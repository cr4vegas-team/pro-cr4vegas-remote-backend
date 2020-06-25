import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from './sensor.entity';
import { MicroEntity } from '../micro/micro.entity';
import { SensorTypeController } from './sensor-type/sensor-type.controller';
import { SensorTypeService } from './sensor-type/sensor-type.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([SensorEntity, MicroEntity]),

  ],

  controllers: [
    SensorController,
    SensorTypeController

  ],

  providers: [
    SensorService,
    SensorTypeService

  ]

})
export class SensorModule { }
