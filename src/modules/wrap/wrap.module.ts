import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { SectorController } from './sector/sector.controller';
import { SectorEntity } from './sector/sector.entity';
import { SectorService } from './sector/sector.service';
import { SetController } from './set/set.controller';
import { SetEntity } from './set/set.entity';
import { SetService } from './set/set.service';
import { StationController } from './station/station.controller';
import { StationEntity } from './station/station.entity';
import { StationService } from './station/station.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity, SetEntity, SectorEntity]),
  ],
  controllers: [
    StationController, SectorController, SetController
  ],
  providers: [
    StationService,
    SectorService,
    SetService,

  ],
  exports: [
    SectorService,
    SetService,
    StationService,
  ]
})
export class WrapModule { }
