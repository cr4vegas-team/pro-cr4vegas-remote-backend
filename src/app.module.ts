import { Module, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitModule } from './modules/unit/unit.module';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { MicroModule } from './modules/micro/micro.module';
import { SensorModule } from './modules/sensor/sensor.module';
import { GlobalExceptionFilter } from './global/global.exception.filter';

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
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      })
    },
  ],
})
export class AppModule {

  constructor(private connection: Connection) { }

}
