import { UserRole } from './../user/user-role.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG } from '../../../config/config.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(CONFIG.APP_JWT_SECRET),
    });
  }

  async validate(payload: {
    id: number;
    username: string;
    email: string;
    role: UserRole;
  }): Promise<any> {
    const user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    };
    return user;
  }
}
