import { Global, Module } from '@nestjs/common';
import { Logger } from './manager';
import { SecretsModule } from 'shared/secrets';

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
