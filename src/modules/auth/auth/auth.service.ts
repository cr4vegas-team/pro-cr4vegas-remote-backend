import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRO } from '../user/user.interfaces';

@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        if (username !== undefined && password !== undefined) {
            const foundUser: UserEntity = await this._userService.findOneToValidation({ username });
            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const { password, ...result } = foundUser;
                return result;
            }
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = { id: user.id, username: user.username, email: user.email };
        return {
            access_token: this._jwtService.sign(payload),
        };
    }

    async signin(dto: CreateUserDto): Promise<UserRO> {
        return this._userService.createOne(dto);
    }

}
