/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
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
    /* TypeOrmModule.forRoot({}), */
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
  ],
})
export class AppModule {}
