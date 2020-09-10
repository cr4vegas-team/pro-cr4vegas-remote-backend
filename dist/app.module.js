"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const config_constant_1 = require("./config/config.constant");
const configuration_1 = require("./config/configuration");
const all_exception_filter_1 = require("./global/filters/all.exception.filter");
const auth_module_1 = require("./modules/auth/auth.module");
const unit_module_1 = require("./modules/unit/unit.module");
const wrap_module_1 = require("./modules/wrap/wrap.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.development.local'],
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => (configService.get(config_constant_1.CONFIG.DATABASE)),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            unit_module_1.UnitModule,
            wrap_module_1.WrapModule
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    transformOptions: { enableImplicitConversion: true },
                })
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map