import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { REQUEST_CONTEXT_TOKEN } from './ioc/tokens';
import { RequestContext } from './types';

export class RequestContextInterceptor implements NestInterceptor {
  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const requestId = request?.requestId ?? randomUUID();
    /*
     * Setting an ID in the global context for each request.
     */
    this.requestContext.setRequestId(requestId);
    return next.handle();
  }
}
