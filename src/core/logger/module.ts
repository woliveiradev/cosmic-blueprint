import { Global, Module, Scope } from '@nestjs/common';
import { WinstonLogger } from './winston.logger';

export const LOGGER_TOKEN = Symbol('LOGGER');

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_TOKEN,
      useClass: WinstonLogger,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
