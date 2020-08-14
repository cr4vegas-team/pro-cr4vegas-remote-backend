import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './user/user.entity';
import { UserController } from './user/user.controller';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG } from 'src/config/config.constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

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
    })
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, ConfigService],
  controllers: [UserController],
  exports: [AuthService]
})
export class AuthModule { }
