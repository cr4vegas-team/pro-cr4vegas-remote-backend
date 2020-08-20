import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRO } from '../user/user.interfaces';
export declare class AuthService {
    private readonly _userService;
    private readonly _jwtService;
    constructor(_userService: UserService, _jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    signin(dto: CreateUserDto): Promise<UserRO>;
}
