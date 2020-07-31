import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { CONFIG } from './config/config.constant';
import { AllExceptionsFilter } from './global/filters/all.exception.filter';
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
      useFactory: (configService: ConfigService) => (configService.get<Object>(CONFIG.DATABASE)),
      inject: [ConfigService],
    }),
    UnitModule,
    WrapModule,
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
  ],
})
export class AppModule { }
