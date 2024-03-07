import { Global, Module } from '@nestjs/common';
import { SecretsModule } from 'shared/secrets';
import { Logger } from './manager';

export const LOGGER_TOKEN = Symbol('LOGGER');

@Global()
@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: LOGGER_TOKEN,
      useClass: Logger,
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LoggersModule {}
