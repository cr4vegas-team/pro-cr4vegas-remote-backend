import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from './unit/unit.entity';
import { UnitService } from './unit/unit.service';
import { UnitHydrantController } from './unit-hydrant/unit-hydrant.controller';
import { UnitHydrantEntity } from './unit-hydrant/unit-hydrant.entity';
import { UnitHydrantService } from './unit-hydrant/unit-hydrant.service';
import { WrapModule } from '../wrap/wrap.module';
import { UnitPondController } from './unit-pond/unit-pond.controller';
import { UnitPondService } from './unit-pond/unit-pond.service';
import { UnitPondEntity } from './unit-pond/unit-pond.entity';
import { UnitController } from './unit/unit.controller';
import { UnitGenericController } from './unit-generic/unit-generic.controller';
import { UnitGenericService } from './unit-generic/unit-generic.service';
import { UnitGenericEntity } from './unit-generic/unit-generic.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([UnitEntity, UnitHydrantEntity, UnitPondEntity, UnitGenericEntity]),
    WrapModule,
  ],

  controllers: [
    UnitHydrantController,
    UnitPondController,
    UnitController,
    UnitGenericController,
  ],

  providers: [
    UnitService,
    UnitHydrantService,
    UnitPondService,
    UnitGenericService,

  ],

  exports: [
    TypeOrmModule,
  ]
})
export class UnitModule { }
