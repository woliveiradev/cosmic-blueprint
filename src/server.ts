import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { RootModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, new FastifyAdapter());
  await app.listen(3333);
}
bootstrap();
