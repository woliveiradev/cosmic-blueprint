import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { Context } from 'core/context';
import { Logger, LoggerLevel } from './types';

export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor(
    @Inject(ConfigService)
    private readonly environment: ConfigService,
  ) {
    this.logger = winston.createLogger({
      exitOnError: false,
      level: LoggerLevel.INFO,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: LoggerLevel.ERROR,
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
    if (this.environment.get('NODE_ENV') !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.prettyPrint(),
        }),
      );
    }
  }

  private log(level: LoggerLevel, message: string, stackTrace?: any): void {
    const logMessage = { level, message, stackTrace, meta: {} };
    if (Context.has()) {
      const context = Context.get();
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

  public error(message: string, stackTrace?: any): void {
    this.log(LoggerLevel.ERROR, message, stackTrace);
  }
}
