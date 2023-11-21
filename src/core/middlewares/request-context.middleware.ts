import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger, LOGGER_TOKEN } from 'core/logger';
import { RequestContext, REQUEST_CONTEXT_TOKEN } from '../request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
    @Inject(LOGGER_TOKEN)
    private readonly logger: Logger,
  ) {}

  public use(request: Request, response: Response, next: any) {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const correlationId = randomUUID();
    const { ip, url, method, headers, hostname } = request;
    const context = {
      correlationId,
      hostname,
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
