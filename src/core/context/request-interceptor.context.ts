import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { RequestContext } from './request.context';

export class RequestContextInterceptor implements NestInterceptor {
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
    RequestContext.setRequestId(requestId);
    return next.handle();
  }
}
