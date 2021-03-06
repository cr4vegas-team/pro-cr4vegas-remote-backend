import { UnitStationPechinaEntity } from './unit-station-pechina/unit-station-pechina.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrapModule } from '../wrap/wrap.module';
import { AppModule } from './../../app.module';
import { SessionModule } from './../session/session.module';
import { SharedModule } from './../shared/shared.module';
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
import { UnitStationPechinaController } from './unit-station-pechina/unit-station-pechina.controller';
import { UnitStationPechinaService } from './unit-station-pechina/unit-station-pechina.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitEntity,
      UnitHydrantEntity,
      UnitPondEntity,
      UnitGenericEntity,
      UnitStationPechinaEntity,
    ]),
    forwardRef(() => WrapModule),
    forwardRef(() => AppModule),
    SharedModule,
    SessionModule,
  ],

  controllers: [
    UnitHydrantController,
    UnitPondController,
    UnitController,
    UnitGenericController,
    UnitStationPechinaController,
  ],

  providers: [
    UnitService,
    UnitHydrantService,
    UnitPondService,
    UnitGenericService,
    UnitStationPechinaService,
  ],

  exports: [
    UnitService,
    UnitHydrantService,
    UnitPondService,
    UnitGenericService,
  ],
})
export class UnitModule { }
