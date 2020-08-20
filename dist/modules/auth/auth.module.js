"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth/auth.service");
const user_entity_1 = require("./user/user.entity");
const user_controller_1 = require("./user/user.controller");
const local_strategy_1 = require("./auth/local.strategy");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("./user/user.service");
const config_1 = require("@nestjs/config");
const config_constant_1 = require("../../config/config.constant");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./auth/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get(config_constant_1.CONFIG.APP_JWT_SECRET),
                    signOptions: { expiresIn: '24h' },
                }),
                inject: [config_1.ConfigService],
            })
        ],
        providers: [auth_service_1.AuthService, user_service_1.UserService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, config_1.ConfigService],
        controllers: [user_controller_1.UserController],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map