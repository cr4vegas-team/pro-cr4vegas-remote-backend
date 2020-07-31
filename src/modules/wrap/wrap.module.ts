import { Module } from '@nestjs/common';
import { StationController } from './station/station.controller';
import { StationService } from './station/station.service';
import { SectorService } from './sector/sector.service';
import { SectorController } from './sector/sector.controller';
import { SetController } from './set/set.controller';
import { SetService } from './set/set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetEntity } from './set/set.entity';
import { SectorEntity } from './sector/sector.entity';
import { StationEntity } from './station/station.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity, SetEntity, SectorEntity]),
  ],
  controllers: [StationController, SectorController, SetController],
  providers: [StationService, SectorService, SetService]
})
export class WrapModule { }
