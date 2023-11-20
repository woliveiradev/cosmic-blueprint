import { Global, Module, Scope, forwardRef } from '@nestjs/common';
import { LOGGER_TOKEN } from './tokens';
import { LoggerImpl } from './logger';
import { RequestContextModule } from 'core/request-context';

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
