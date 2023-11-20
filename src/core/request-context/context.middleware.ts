import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger, LOGGER_TOKEN } from 'core/logger';
import { RequestContext, REQUEST_CONTEXT_TOKEN } from '../request-context';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
    @Inject(LOGGER_TOKEN)
    private readonly logger: Logger,
  ) {}

  public use(request: FastifyRequest, response: FastifyReply, next: any) {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const correlationId = randomUUID();
    const { ip, url, method, headers } = request;
    const context = {
      correlationId,
      client: {
        ip,
        userAgent: headers['user-agent'],
      },
      request: {
        method,
        url,
      },
      buildInfo: {
        appVersion: packageJson.version,
      },
    };
    this.requestContext.setContext(context, () => {
      this.logger.info('new request received');
      next();
    });
  }
}
