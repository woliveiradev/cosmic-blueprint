import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { LOGGER_TOKEN, Logger } from 'core/logger';

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  constructor(@Inject(LOGGER_TOKEN) private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus();
    this.logger.error('Request interrupted with exception', exception.stack);
    response.status(status).send({
      code: exception.name,
      message: exception.message,
      resource_path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
