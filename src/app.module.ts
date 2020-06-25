

import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitHydrantModule } from './modules/unit/unit-hydrant/unit-hydrant.module';
import { UnitModule } from './modules/unit/unit.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MicroModule } from './modules/micro/micro.module';

@Module({

  imports: [
    TypeOrmModule.forRoot(),
    UnitModule,
    UnitHydrantModule,
    MicroModule,
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
