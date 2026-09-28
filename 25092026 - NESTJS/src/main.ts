import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const configService =
    app.get(ConfigService);

  const port =
    configService.get<number>(
      'PORT',
      3000,
    );

  await app.listen(port);
}

bootstrap();