import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorEntity } from './sensor.entity';
import { MicroEntity } from '../micro/micro.entity';
import { SensorTypeService } from './sensor-type/sensor-type.service';
import { SensorTypeEntity } from './sensor-type/sensor-type.entity';
import { SensorTypeController } from './sensor-type/sensor-type.controller';
import { MicroModule } from '../micro/micro.module';
import { SensorAlarmController } from './sensor-alarm/sensor-alarm.controller';
import { SensorAlarmService } from './sensor-alarm/sensor-alarm.service';
import { SensorRecordService } from './sensor-record/sensor-record.service';
import { SensorRecordController } from './sensor-record/sensor-record.controller';

@Module({

  imports: [
    TypeOrmModule.forFeature([SensorEntity, SensorTypeEntity]),
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
