import { NestFactory } from '@nestjs/core';
import { HttpStatus, VersioningType } from '@nestjs/common';
import { RootModule } from './module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.enableCors({
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(helmet());
  await app.listen(3333);
}
bootstrap();
