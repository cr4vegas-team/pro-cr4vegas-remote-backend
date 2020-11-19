import { AuthService } from './modules/auth/auth/auth.service';
import { TokenRO } from './modules/auth/auth/dto/auth-response.dto';
import { UserCreateDto } from './modules/auth/user/dto/user-create.dto';
import { UserDto, UserRO } from './modules/auth/user/dto/user-response.dto';
export declare class AppController {
    private readonly _authService;
    constructor(_authService: AuthService);
    validate(req: any): Promise<UserDto>;
    login(req: any): Promise<TokenRO>;
    signin(dto: UserCreateDto): Promise<UserRO>;
}
