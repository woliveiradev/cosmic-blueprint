import { FastifyReply, FastifyRequest } from 'fastify';
import { RequestContext } from 'core/context';
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
    const context = RequestContext.getContext();
    response.status(status).send({
      request_id: context.requestId,
      code: exception.name,
      message: exception.message,
      route: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
