import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserRO } from '../user/dto/user-response.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserDto } from './../user/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<UserDto> {
    const foundUser: UserEntity = await this._userService.findOneToValidation(
      username,
    );
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const userDto: UserDto = new UserDto();
      userDto.id = foundUser.id;
      userDto.username = foundUser.username;
      userDto.email = foundUser.email;
      userDto.role = foundUser.role;
      userDto.active = foundUser.active;
      return userDto;
    } else {
      return null;
    }
  }

  async getToken(userDto: UserDto): Promise<any> {
    const payload = {
      id: userDto.id,
      username: userDto.username,
      email: userDto.email,
      role: userDto.role,
    };
    console.log(userDto);
    return {
      access_token: this._jwtService.sign(payload),
      user: userDto,
    };
  }

  async signin(dto: UserCreateDto): Promise<UserRO> {
    return this._userService.createOne(dto);
  }
}
