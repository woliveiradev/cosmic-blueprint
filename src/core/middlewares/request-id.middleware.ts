import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RequestContext } from 'core/request-context';
import { REQUEST_CONTEXT_TOKEN } from '../request-context/tokens';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
  ) {}

  public use(request: FastifyRequest, response: FastifyReply, next: any) {
    const requestId = randomUUID();
    const idempotencyKey = request.headers['x-idempotency-key'] as string;
    this.requestContext.setContext({ requestId, idempotencyKey }, next);
  }
}
