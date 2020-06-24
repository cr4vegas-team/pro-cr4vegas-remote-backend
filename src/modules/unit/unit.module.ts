import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from './entity/unit.entity';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([UnitEntity]),
  ],

  controllers: [
    UnitController
  ],

  providers: [
    UnitService
  ],

  exports: [
    TypeOrmModule,
  ]
})
export class UnitModule { }
