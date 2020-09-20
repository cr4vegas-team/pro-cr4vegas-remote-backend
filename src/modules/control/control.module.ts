import { RegistryEntity } from './registry/registry.entity';
import { OrderEntity } from './order/order.entity';
import { ManageEntity } from './manage/manage.entity';
import { ControlEntity } from './control/control.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegistryController } from './registry/registry.controller';
import { RegistryService } from './registry/registry.service';
import { ManageController } from './manage/manage.controller';
import { ManageService } from './manage/manage.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { ControlController } from './control/control.controller';
import { ControlService } from './control/control.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      ControlEntity,
      ManageEntity,
      OrderEntity,
      RegistryEntity,
    ])
  ],

  controllers: [
    RegistryController, 
    ManageController, 
    OrderController, 
    ControlController
  ],

  providers: [
    RegistryService, 
    ManageService, 
    OrderService, 
    ControlService
  ]

})
export class ControlModule {}
