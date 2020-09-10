import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONFIG } from './config/config.constant';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get(CONFIG.APP_GLOBAL_PREFIX));

  const options = new DocumentBuilder()
    .setTitle('API - Comunidad de regantes las cuatro vegas de Almería')
    .setDescription('Control remoto. Autor: Rubén Francisco Gazquez Rosales')
    .setVersion('0.1.0')
    .addTag('cr4vegas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: true,
    allowedHeaders: ['Authorization, X-HTTP-Method-Override, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'],
    methods: ["GET,PUT,POST,DELETE,UPDATE,OPTIONS"],
    credentials: true,
  });

  await app.listen(configService.get(CONFIG.APP_PORT));

}
bootstrap();
