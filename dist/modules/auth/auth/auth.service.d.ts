import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserRO } from '../user/dto/user-response.dto';
import { UserService } from '../user/user.service';
import { UserDto } from './../user/dto/user-response.dto';
export declare class AuthService {
    private readonly _userService;
    private readonly _jwtService;
    constructor(_userService: UserService, _jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserDto>;
    getToken(userDto: UserDto): Promise<any>;
    signin(dto: UserCreateDto): Promise<UserRO>;
}
