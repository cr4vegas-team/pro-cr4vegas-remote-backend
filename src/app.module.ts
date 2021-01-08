/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ClassSerializerInterceptor,
  Inject,

  Module,

  OnApplicationBootstrap,

  ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  ClientProxy,
  ClientProxyFactory,
  ClientsModule,
  Transport
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CONFIG } from './config/config.constant';
import configuration from './config/configuration';
import { AllExceptionsFilter } from './global/filters/all.exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';
import { SharedModule } from './modules/shared/shared.module';
import { UnitModule } from './modules/unit/unit.module';
import { WrapModule } from './modules/wrap/wrap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<any>(CONFIG.DATABASE),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
      },
    ]),
    AuthModule,
    UnitModule,
    WrapModule,
    SessionModule,
    SharedModule,
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'MQTT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const options = configService.get<any>(CONFIG.MQTT);
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],

  exports: [ClientsModule],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) { }

  onApplicationBootstrap() {
    this.client.connect().then(() => {
      console.log('Conexión a MQTT exitosa!!!');
    }).catch((error) => {
      console.log(error);
    });
  }
}
