import * as winston from 'winston';
import { Inject } from '@nestjs/common';
import { REQUEST_CONTEXT_TOKEN, RequestContext } from 'core/request-context';
import { winstonConfig } from './config';
import { Logger, LoggerLevel } from './types';

export class LoggerImpl implements Logger {
  private readonly logger = winston.createLogger(winstonConfig);

  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
  ) {}

  private log(level: LoggerLevel, message: string, stack?: any): void {
    const logMessage = { level, message, stack, meta: {} };
    if (this.requestContext.hasContext()) {
      const context = this.requestContext.getContext();
      logMessage.meta = context;
    }
    this.logger.log(logMessage);
  }

  public debug(message: string): void {
    this.log(LoggerLevel.DEBUG, message);
  }

  public info(message: string): void {
    this.log(LoggerLevel.INFO, message);
  }

  public warn(message: string): void {
    this.log(LoggerLevel.WARN, message);
  }

  public error(message: string, stack?: any): void {
    this.log(LoggerLevel.ERROR, message, stack);
  }
}
