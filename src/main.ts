import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONFIG } from './config/config.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  // ==================================================
  //  CORS Configuration
  // ==================================================
  app.enableCors({
    origin: "*",
    allowedHeaders: [
      'Authorization, X-HTTP-Method-Override, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    ],
    methods: ['GET,PUT,POST,DELETE,UPDATE,OPTIONS'],
    credentials: true,
  });

  // ==================================================
  //  Global Prefix adjust
  // ==================================================
  app.setGlobalPrefix(configService.get(CONFIG.APP_GLOBAL_PREFIX));

  // ==================================================
  //  SwaggerModule configuration
  // ==================================================
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API - Comunidad de regantes las cuatro vegas de Almería')
    .setDescription('Proyecto para el control remoto y estadística')
    .setBasePath('swagger')
    .setLicense('MIT', 'https://www.mit.edu/~amini/LICENSE.md')
    .setContact(
      'Rubén Francisco Gazquez Rosales',
      'https://github.com/rubenfgr',
      'rubenfgr87@outlook.com',
    )
    .setVersion('1.0.0')
    .addTag('cr4vegas')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // ==================================================
  //  load WS Adapter
  // ==================================================
  app.useWebSocketAdapter(new WsAdapter(app));

  // ==================================================
  //  Connect MQTT Microservices
  // ==================================================
  app.connectMicroservice<MicroserviceOptions>(
    configService.get<any>(CONFIG.MQTT),
  );
  app
    .startAllMicroservicesAsync()
    .then(() => {
      console.log('Microservicios inicializados!');
    })
    .catch(() => {
      console.log('ERROR al inicializar los microservicios');
    });

  // ==================================================
  //  Launch APP
  // ==================================================
  await app
    .listen(configService.get(CONFIG.APP_PORT))
    .then(() =>
      console.log(
        'APP escuchando en el puerto ' + configService.get(CONFIG.APP_PORT),
      ),
    )
    .catch(() =>
      console.log(
        'ERROR al inicializar la aplicación en el puerto ' +
          configService.get(CONFIG.APP_PORT),
      ),
    );
}
bootstrap();
