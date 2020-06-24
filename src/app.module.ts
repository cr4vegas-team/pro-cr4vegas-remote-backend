

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitHydrantModule } from './modules/unit/unit-hydrant/unit-hydrant.module';
import { UnitModule } from './modules/unit/unit.module';

@Module({

  imports: [
    TypeOrmModule.forRoot(),
    UnitModule,
    UnitHydrantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(private connection: Connection) {
    if (connection.isConnected) {
      console.log('MySQL Connected - OK');
    }
  }

}
