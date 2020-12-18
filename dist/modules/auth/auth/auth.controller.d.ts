import { UserCreateDto } from '../user/dto/user-create.dto';
import { UserDto, UserRO } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { TokenRO } from './dto/auth-response.dto';
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    validate(req: any): Promise<UserDto>;
    login(req: any): Promise<TokenRO>;
    signin(dto: UserCreateDto): Promise<UserRO>;
}
