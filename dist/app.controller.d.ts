import { AuthService } from './modules/auth/auth/auth.service';
import { CreateUserDto } from './modules/auth/user/dto/create-user.dto';
import { UserRO } from './modules/auth/user/user.interfaces';
export declare class AppController {
    private readonly _authService;
    constructor(_authService: AuthService);
    validate(req: any): any;
    login(req: any): Promise<{
        access_token: string;
    }>;
    signin(dto: CreateUserDto): Promise<UserRO>;
}
