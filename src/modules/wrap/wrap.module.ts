import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from '../unit/unit.module';
import { SectorController } from './sector/sector.controller';
import { SectorEntity } from './sector/sector.entity';
import { SectorGateway } from './sector/sector.gateway';
import { SectorService } from './sector/sector.service';
import { SetTypeEntity } from './set/set-type.entity';
import { SetController } from './set/set.controller';
import { SetEntity } from './set/set.entity';
import { SetGateway } from './set/set.gateway';
import { SetService } from './set/set.service';
import { StationController } from './station/station.controller';
import { StationEntity } from './station/station.entity';
import { StationGateway } from './station/station.gateway';
import { StationService } from './station/station.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StationEntity,
      SetEntity,
      SectorEntity,
      SetTypeEntity,
    ]),
    forwardRef(() => UnitModule),
  ],
  controllers: [StationController, SectorController, SetController],
  providers: [
    StationService,
    SectorService,
    SetService,
    SectorGateway,
    SetGateway,
    StationGateway,
  ],
  exports: [StationService, SectorService, SetService],
})
export class WrapModule {}
