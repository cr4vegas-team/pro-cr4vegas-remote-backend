import { UserRole } from './../user/user-role.enum';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _configService;
    constructor(_configService: ConfigService);
    validate(payload: {
        id: number;
        username: string;
        email: string;
        role: UserRole;
    }): Promise<any>;
}
export {};
