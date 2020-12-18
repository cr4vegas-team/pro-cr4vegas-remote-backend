import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from '../../config/config.constant';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { UserController } from './user/user.controller';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(CONFIG.APP_JWT_SECRET),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],

  controllers: [UserController, AuthController],

  exports: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],
})
export class AuthModule {}
