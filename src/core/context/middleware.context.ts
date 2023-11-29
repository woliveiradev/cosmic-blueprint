import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger, LOGGER_TOKEN } from 'core/logger';
import { Context } from './context';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOGGER_TOKEN)
    private readonly logger: Logger,
  ) {}

  public use(request: Request, response: Response, next: any) {
    const correlationId = randomUUID();
    Context.new({ correlationId }, next);
  }
}
