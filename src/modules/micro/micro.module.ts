import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from '../unit/entity/unit.entity';
import { MicroEntity } from './entity/micro.entity';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([MicroEntity, UnitEntity]),
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
