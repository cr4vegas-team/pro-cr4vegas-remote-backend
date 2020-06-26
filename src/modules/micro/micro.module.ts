import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from '../unit/unit.entity';
import { UnitModule } from '../unit/unit.module';
import { MicroController } from './micro.controller';
import { MicroEntity } from './micro.entity';
import { MicroService } from './micro.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([MicroEntity]),
    UnitModule
  ],

  controllers: [
    MicroController
  ],

  providers: [
    MicroService,
  ],

  exports: [
    TypeOrmModule,

  ]
})
export class MicroModule { }
