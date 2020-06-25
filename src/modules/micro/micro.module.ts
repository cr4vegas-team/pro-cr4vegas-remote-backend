import { Module } from '@nestjs/common';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroEntity } from './entity/micro.entity';
import { UnitEntity } from '../unit/entity/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MicroEntity, UnitEntity]),
  ],
  controllers: [MicroController],
  providers: [MicroService]
})
export class MicroModule {}
