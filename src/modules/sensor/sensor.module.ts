import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroModule } from '../micro/micro.module';
import { SensorAlarmController } from './sensor-alarm/sensor-alarm.controller';
import { SensorAlarmService } from './sensor-alarm/sensor-alarm.service';
import { SensorRecordController } from './sensor-record/sensor-record.controller';
import { SensorRecordService } from './sensor-record/sensor-record.service';
import { SensorTypeController } from './sensor-type/sensor-type.controller';
import { SensorTypeEntity } from './sensor-type/sensor-type.entity';
import { SensorTypeService } from './sensor-type/sensor-type.service';
import { SensorController } from './sensor.controller';
import { SensorEntity } from './sensor.entity';
import { SensorService } from './sensor.service';
import { SensorRecordEntity } from './sensor-record/sensor-record.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([SensorEntity, SensorTypeEntity, SensorRecordEntity]),
    MicroModule,
  ],

  controllers: [
    SensorController,
    SensorTypeController,
    SensorAlarmController,
    SensorRecordController

  ],

  providers: [
    SensorService,
    SensorTypeService,
    SensorAlarmService,
    SensorRecordService

  ],

  exports: [
    TypeOrmModule,

  ]

})
export class SensorModule { }
