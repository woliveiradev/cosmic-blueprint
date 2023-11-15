import { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'crypto';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    response.status(status).send({
      request_id: randomUUID(),
      code: exception.name,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
