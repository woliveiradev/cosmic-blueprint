import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<FastifyRequest>();
    const response = context.getResponse<FastifyReply>();
    const status = exception.getStatus();
    response.status(status).send({
      request_id: null,
      code: exception.name,
      message: exception.message,
      route: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
