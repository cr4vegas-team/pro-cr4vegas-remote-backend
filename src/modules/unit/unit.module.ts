import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrapModule } from '../wrap/wrap.module';
import { AppModule } from './../../app.module';
import { SharedModule } from './../shared/shared.module';
import { UnitGenericMqttController } from './unit-generic/unit-generic-mqtt.controller';
import { UnitGenericController } from './unit-generic/unit-generic.controller';
import { UnitGenericEntity } from './unit-generic/unit-generic.entity';
import { UnitGenericGateway } from './unit-generic/unit-generic.gateway';
import { UnitGenericService } from './unit-generic/unit-generic.service';
import { UnitHydrantMqttController } from './unit-hydrant/unit-hydrant-mqtt.controller';
import { UnitHydrantController } from './unit-hydrant/unit-hydrant.controller';
import { UnitHydrantEntity } from './unit-hydrant/unit-hydrant.entity';
import { UnitHydrantGateway } from './unit-hydrant/unit-hydrant.gateway';
import { UnitHydrantService } from './unit-hydrant/unit-hydrant.service';
import { UnitPondMqttController } from './unit-pond/unit-pond-mqtt.controller';
import { UnitPondController } from './unit-pond/unit-pond.controller';
import { UnitPondEntity } from './unit-pond/unit-pond.entity';
import { UnitPondGateway } from './unit-pond/unit-pond.gateway';
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
    UnitHydrantMqttController,
    UnitPondMqttController,
    UnitGenericMqttController,
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
