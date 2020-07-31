import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from './unit/unit.controller';
import { UnitEntity } from './unit/unit.entity';
import { UnitService } from './unit/unit.service';
import { UnitHydrantController } from './unit-hydrant/unit-hydrant.controller';
import { UnitHydrantEntity } from './unit-hydrant/unit-hydrant.entity';
import { UnitHydrantService } from './unit-hydrant/unit-hydrant.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([UnitEntity, UnitHydrantEntity]),
  ],

  controllers: [
    UnitController,
    UnitHydrantController,
  ],

  providers: [
    UnitService,
    UnitHydrantService
  ],

  exports: [
    TypeOrmModule,
  ]
})
export class UnitModule { }
