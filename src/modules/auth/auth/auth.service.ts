/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserRO } from '../user/dto/user-response.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SessionService } from './../../session/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _sessionService: SessionService,
  ) { }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const foundUser: UserEntity = await this._userService.findOneToValidation(
      username,
    );
    if (foundUser && bcrypt.compareSync(pass, foundUser.password)) {
      delete foundUser.password;
      return foundUser;
    } else {
      return null;
    }
  }

  async validateSession(id: number): Promise<boolean> {
    const findSession = await this._sessionService.findOneById(id);
    if (findSession.session && findSession.session.active == 1) {
      return true;
    } else {
      return false;
    }
  }

  async getToken(req: any): Promise<any> {
    const session = (await this._sessionService.startSession(req)).session;
    const user = req.user;
    delete session.user;
    user.session = session;
    const payload = classToPlain(user);
    return {
      access_token: this._jwtService.sign(payload),
      user
    };
  }

  async signin(dto: UserCreateDto): Promise<UserRO> {
    return this._userService.createOne(dto);
  }
}
