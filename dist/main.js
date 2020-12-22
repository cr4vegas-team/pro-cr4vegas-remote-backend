"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_ws_1 = require("@nestjs/platform-ws");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_constant_1 = require("./config/config.constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(configService.get(config_constant_1.CONFIG.APP_GLOBAL_PREFIX));
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('API - Comunidad de regantes las cuatro vegas de Almería')
        .setDescription('Proyecto para el control remoto y estadística')
        .setBasePath('swagger')
        .setLicense('MIT', 'https://www.mit.edu/~amini/LICENSE.md')
        .setContact('Rubén Francisco Gazquez Rosales', 'https://github.com/rubenfgr', 'rubenfgr87@outlook.com')
        .setVersion('1.0.0')
        .addTag('cr4vegas')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.enableCors({
        origin: '*',
        allowedHeaders: [
            'Authorization, X-HTTP-Method-Override, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Origin',
        ],
        methods: ['GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS'],
        credentials: true,
    });
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: 'mqtts://emqx.rubenfgr.com:8883',
            rejectUnauthorized: false,
        },
    });
    app.startAllMicroservicesAsync();
    await app.listen(configService.get(config_constant_1.CONFIG.APP_PORT));
}
bootstrap();
//# sourceMappingURL=main.js.map