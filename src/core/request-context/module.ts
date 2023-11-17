import { Module } from '@nestjs/common';
import { RequestContextImpl } from './request.context';
import { REQUEST_CONTEXT_TOKEN } from './tokens';

@Module({
  providers: [
    {
      provide: REQUEST_CONTEXT_TOKEN,
      useClass: RequestContextImpl,
    },
  ],
  exports: [REQUEST_CONTEXT_TOKEN],
})
export class RequestContextModule {}
