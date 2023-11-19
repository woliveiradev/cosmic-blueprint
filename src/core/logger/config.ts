import * as winston from 'winston';
import { LoggerLevel } from './types';

export const winstonConfig: winston.LoggerOptions = {
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
};
