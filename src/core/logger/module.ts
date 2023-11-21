import { Global, Module, Scope, forwardRef } from '@nestjs/common';
import { RequestContextModule } from 'core/request-context';
import { LoggerImpl } from './logger';

export const LOGGER_TOKEN = Symbol('LOGGER');

@Global()
@Module({
  imports: [forwardRef(() => RequestContextModule)],
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
