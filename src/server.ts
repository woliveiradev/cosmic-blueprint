import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { HttpStatus, VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { RootModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    RootModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });
  app.register(helmet);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(3333);
}
bootstrap();
