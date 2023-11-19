import { Global, Module, Scope } from '@nestjs/common';
import { LOGGER_TOKEN } from './tokens';
import { LoggerImpl } from './logger';
import { RequestContextModule } from 'core/request-context';

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
