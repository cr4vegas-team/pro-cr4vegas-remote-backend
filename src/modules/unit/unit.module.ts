import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from './unit.entity';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitHydrantEntity } from './unit-hydrant/unit-hydrant.entity';
import { UnitHydrantController } from './unit-hydrant/unit-hydrant.controller';
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
    UnitHydrantService,
  ],

  exports: [
    TypeOrmModule,
  ]
})
export class UnitModule { }
