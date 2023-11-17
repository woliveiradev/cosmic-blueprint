import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { RequestContext } from 'core/request-context';
import { REQUEST_CONTEXT_TOKEN } from 'core/request-context/tokens';

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
    const { requestId } = this.requestContext.getContext();
    response.status(status).send({
      request_id: requestId,
      code: exception.name,
      message: exception.message,
      route: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
