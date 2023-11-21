import { Global, Module, Scope } from '@nestjs/common';
import { RequestContextModule } from 'core/request-context';
import { LoggerImpl } from './logger';

export const LOGGER_TOKEN = Symbol('LOGGER');

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [
    {
      provide: LOGGER_TOKEN,
      useClass: LoggerImpl,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
