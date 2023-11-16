import { FastifyReply, FastifyRequest } from 'fastify';
import { RequestContext } from 'core/context';
import { REQUEST_CONTEXT_TOKEN } from 'core/context/ioc/tokens';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  constructor(
    @Inject(REQUEST_CONTEXT_TOKEN)
    private readonly requestContext: RequestContext,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<FastifyRequest>();
    const response = context.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const requestId = this.requestContext.getRequestId();
    response.status(status).send({
      request_id: requestId,
      code: exception.name,
      message: exception.message,
      route: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
