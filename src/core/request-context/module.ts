import { Module } from '@nestjs/common';
import { RequestContextImpl } from './request.context';

export const REQUEST_CONTEXT_TOKEN = Symbol('REQUEST_CONTEXT');

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
