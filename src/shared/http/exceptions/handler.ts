import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import {
  BaseError,
  InternalResourceError,
  ResourceNotFoundError,
} from 'shared/core/errors';

@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  public catch(error: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    if (error instanceof NotFoundException) {
      const notFoundError = new ResourceNotFoundError(
        `http route ${request.url}`,
      );
      return response
        .status(notFoundError.getStatus())
        .json(this.errorResponse(notFoundError));
    }
    if (!(error instanceof BaseError)) {
      const internalError = new InternalResourceError();
      return response
        .status(internalError.getStatus())
        .json(this.errorResponse(internalError));
    }
    const status = error.getStatus();
    return response.status(status).json(this.errorResponse(error));
  }

  private errorResponse(error: BaseError) {
    return {
      code: error.name,
      message: error.message,
      timestamp: error.timestamp,
    };
  }
}
