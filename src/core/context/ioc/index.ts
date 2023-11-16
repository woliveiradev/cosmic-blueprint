import { Module } from '@nestjs/common';
import { RequestContextInterceptor } from '../request-interceptor.context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextModule } from 'nestjs-request-context';
import { REQUEST_CONTEXT_TOKEN } from './tokens';
import { RequestContextImpl } from '../request.context';

@Module({
  imports: [RequestContextModule],
  providers: [
    {
      provide: REQUEST_CONTEXT_TOKEN,
      useClass: RequestContextImpl,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
  exports: [REQUEST_CONTEXT_TOKEN],
})
export class ContextModule {}
