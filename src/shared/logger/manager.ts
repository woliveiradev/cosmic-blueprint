import { InjectAdapter } from 'shared/di';
import { SECRETS_MANAGER_TOKEN, SecretsManagerGateway } from 'shared/secrets';
import * as winston from 'winston';

export enum LoggerLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LoggerGateway {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string, stack?: any): void;
}

export class Logger implements LoggerGateway {
  private readonly logger: winston.Logger;

  constructor(
    @InjectAdapter(SECRETS_MANAGER_TOKEN)
    private readonly secretsManagerGateway: SecretsManagerGateway,
  ) {
    const environment = this.secretsManagerGateway.getValue('ENVIRONMENT');
    const isProduction = environment === 'PRODUCTION';
    this.logger = winston.createLogger({
      exitOnError: false,
      level: isProduction ? LoggerLevel.INFO : LoggerLevel.DEBUG,
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
    if (!isProduction) {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.prettyPrint(),
        }),
      );
    }
  }

  public debug(message: string): void {
    this.logger.log(LoggerLevel.DEBUG, message);
  }

  public info(message: string): void {
    this.logger.log(LoggerLevel.INFO, message);
  }

  public warn(message: string): void {
    this.logger.log(LoggerLevel.WARN, message);
  }

  public error(message: string, stackTrace?: any): void {
    this.logger.log(LoggerLevel.ERROR, message, stackTrace);
  }
}
