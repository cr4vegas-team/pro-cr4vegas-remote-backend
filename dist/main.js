"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const config_constant_1 = require("./config/config.constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(configService.get(config_constant_1.CONFIG.APP_GLOBAL_PREFIX));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API - Comunidad de regantes las cuatro vegas de Almería')
        .setDescription('Control remoto. Autor: Rubén Francisco Gazquez Rosales')
        .setVersion('0.1.0')
        .addTag('cr4vegas')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.enableCors({
        origin: true,
        allowedHeaders: ['Authorization, X-HTTP-Method-Override, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'],
        methods: ["GET,PUT,POST,DELETE,UPDATE,OPTIONS"],
        credentials: true,
    });
    await app.listen(configService.get(config_constant_1.CONFIG.APP_PORT));
}
bootstrap();
//# sourceMappingURL=main.js.map