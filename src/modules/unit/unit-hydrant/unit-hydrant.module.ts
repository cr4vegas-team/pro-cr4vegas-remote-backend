

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitEntity } from '../entity/unit.entity';
import { UnitHydrantEntity } from './entity/unit-hydrant.entity';
import { UnitHydrantController } from './unit-hydrant.controller';
import { UnitHydrantService } from './unit-hydrant.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([UnitEntity, UnitHydrantEntity]),
  ],

  controllers: [
    UnitHydrantController,

  ],

  providers: [
    UnitHydrantService,

  ],

  exports: [
    TypeOrmModule,
    
  ]

})
export class UnitHydrantModule { }
