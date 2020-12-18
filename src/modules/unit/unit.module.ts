import { SharedModule } from './../shared/shared.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrapModule } from '../wrap/wrap.module';
import { AppModule } from './../../app.module';
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
import { UnitHydrantGateway } from './unit-hydrant/unit-hydrant.gateway';
import { UnitPondGateway } from './unit-pond/unit-pond.gateway';
import { UnitGenericGateway } from './unit-generic/unit-generic.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnitEntity,
      UnitHydrantEntity,
      UnitPondEntity,
      UnitGenericEntity,
    ]),
    forwardRef(() => WrapModule),
    forwardRef(() => AppModule),
    SharedModule,
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
    UnitHydrantGateway,
    UnitGenericGateway,
    UnitPondGateway,
  ],

  exports: [
    UnitService,
    UnitHydrantService,
    UnitPondService,
    UnitGenericService,
  ],
})
export class UnitModule {}
