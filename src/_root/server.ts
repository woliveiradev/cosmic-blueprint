import { HttpStatus, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SECRETS_MANAGER_TOKEN, SecretsManagerGateway } from 'shared/secrets';
import { RootModule } from './module';

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
  const secretsManager = app.get<SecretsManagerGateway>(SECRETS_MANAGER_TOKEN);
  await app.listen(secretsManager.getValue('APP_PORT'));
}
bootstrap();
