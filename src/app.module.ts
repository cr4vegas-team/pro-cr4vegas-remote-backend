

import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitModule } from './modules/unit/unit.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MicroModule } from './modules/micro/micro.module';
import { SensorModule } from './modules/sensor/sensor.module';

@Module({

  imports: [
    TypeOrmModule.forRoot(),
    UnitModule,
    MicroModule,
    SensorModule,
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {

  constructor(private connection: Connection) { }

}
