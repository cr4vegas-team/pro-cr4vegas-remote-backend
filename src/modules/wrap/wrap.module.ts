import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from '../unit/unit.module';
import { SessionModule } from './../session/session.module';
import { SectorController } from './sector/sector.controller';
import { SectorEntity } from './sector/sector.entity';
import { SectorService } from './sector/sector.service';
import { SetTypeEntity } from './set/set-type.entity';
import { SetController } from './set/set.controller';
import { SetEntity } from './set/set.entity';
import { SetService } from './set/set.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SetEntity, SectorEntity, SetTypeEntity]),
    forwardRef(() => UnitModule),
    SessionModule,
  ],
  controllers: [SectorController, SetController],
  providers: [SectorService, SetService],
  exports: [SectorService, SetService],
})
export class WrapModule {}
