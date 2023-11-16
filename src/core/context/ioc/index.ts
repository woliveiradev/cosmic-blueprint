import { Global, Module } from '@nestjs/common';
import { RequestContextInterceptor } from '../request-interceptor.context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextModule } from 'nestjs-request-context';

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class ContextModule {}
