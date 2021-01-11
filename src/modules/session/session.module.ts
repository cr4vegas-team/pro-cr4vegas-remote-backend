import { SessionController } from './session/session.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action/action.controller';
import { ActionEntity } from './action/action.entity';
import { ActionService } from './action/action.service';
import { OrderController } from './order/order.controller';
import { OrderEntity } from './order/order.entity';
import { OrderService } from './order/order.service';
import { RegistryController } from './registry/registry.controller';
import { RegistryEntity } from './registry/registry.entity';
import { RegistryService } from './registry/registry.service';
import { SessionEntity } from './session/session.entity';
import { SessionService } from './session/session.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      ActionEntity,
      OrderEntity,
      RegistryEntity,
    ])
  ],

  controllers: [
    RegistryController,
    OrderController,
    ActionController,
    SessionController,
  ],

  providers: [
    RegistryService,
    ActionService,
    OrderService,
    SessionService
  ],

  exports: [
    SessionService,
    RegistryService
  ]

})
export class SessionModule { }
