import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationService } from '../wrap/station/station.service';
import { WrapModule } from '../wrap/wrap.module';
import { UnitGenericController } from './unit-generic/unit-generic.controller';
import { UnitGenericEntity } from './unit-generic/unit-generic.entity';
import { UnitGenericService } from './unit-generic/unit-generic.service';
import { UnitHydrantController } from './unit-hydrant/unit-hydrant.controller';
import { UnitHydrantEntity } from './unit-hydrant/unit-hydrant.entity';
import { UnitHydrantService } from './unit-hydrant/unit-hydrant.service';
import { UnitPondController } from './unit-pond/unit-pond.controller';
import { UnitPondEntity } from './unit-pond/unit-pond.entity';
import { UnitPondService } from './unit-pond/unit-pond.service';
import { UnitController } from './unit/unit.controller';
import { UnitEntity } from './unit/unit.entity';
import { UnitService } from './unit/unit.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      UnitEntity, 
      UnitHydrantEntity, 
      UnitPondEntity, 
      UnitGenericEntity
    ]),
    forwardRef(() => WrapModule),
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
    UnitService,
    UnitHydrantService,
    UnitPondService,
    UnitGenericService,
  ]
})
export class UnitModule { }
