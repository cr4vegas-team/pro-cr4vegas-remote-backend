import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GLOBAL } from './global/constants/global.constant';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  console.log(configService);

  app.setGlobalPrefix(configService.get(GLOBAL.APP_GLOBAL_PREFIX));

  const options = new DocumentBuilder()
    .setTitle('API - Comunidad de regantes las cuatro vegas de Almería')
    .setDescription('Control remoto. Autor: Rubén Francisco Gazquez Rosales')
    .setVersion('0.1.0')
    .addTag('cr4vegas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get(GLOBAL.APP_PORT));

}
bootstrap();
