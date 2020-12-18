"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const config_constant_1 = require("./config/config.constant");
const configuration_1 = require("./config/configuration");
const all_exception_filter_1 = require("./global/filters/all.exception.filter");
const auth_module_1 = require("./modules/auth/auth.module");
const general_module_1 = require("./modules/general/general.module");
const session_module_1 = require("./modules/session/session.module");
const shared_module_1 = require("./modules/shared/shared.module");
const unit_module_1 = require("./modules/unit/unit.module");
const wrap_module_1 = require("./modules/wrap/wrap.module");
let AppModule = class AppModule {
    constructor(client) {
        this.client = client;
    }
    async onApplicationBootstrap() {
        await this.client.connect();
    }
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
                useFactory: (configService) => configService.get(config_constant_1.CONFIG.DATABASE),
                inject: [config_1.ConfigService],
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'MQTT_SERVICE',
                    transport: microservices_1.Transport.MQTT
                },
            ]),
            auth_module_1.AuthModule,
            unit_module_1.UnitModule,
            wrap_module_1.WrapModule,
            session_module_1.SessionModule,
            shared_module_1.SharedModule,
            general_module_1.GeneralModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    transformOptions: { enableImplicitConversion: true },
                }),
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
            {
                provide: 'MQTT_SERVICE',
                useFactory: (configService) => {
                    const options = configService.get(config_constant_1.CONFIG.MQTT);
                    return microservices_1.ClientProxyFactory.create(options);
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [microservices_1.ClientsModule],
    }),
    __param(0, common_1.Inject('MQTT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map