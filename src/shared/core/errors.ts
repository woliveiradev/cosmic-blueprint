import { HttpException, HttpStatus } from '@nestjs/common';

enum ResourceErrors {
  Conflict = 'RESOURCE_CONFLICT',
  Failed = 'RESOURCE_FAILED',
  Forbidden = 'RESOURCE_FORBIDDEN',
  NotFound = 'RESOURCE_NOT_FOUND',
  Unauthorized = 'RESOURCE_UNAUTHORIZED',
  InternalError = 'INTERNAL_RESOURCE_ERROR',
}

export abstract class BaseError extends HttpException {
  public readonly timestamp: Date;
  constructor(message: string, status: number) {
    super(message, status);
    this.timestamp = new Date();
  }
}

export class ResourceConflictError extends BaseError {
  constructor(resourceName: string) {
    super(
      `The specified ${resourceName.toLowerCase()} already exists`,
      HttpStatus.CONFLICT,
    );
    this.name = ResourceErrors.Conflict;
  }
}

export class ResourceFailedError extends BaseError {
  constructor(message: string | string[]) {
    super(message as string, HttpStatus.BAD_REQUEST);
    this.name = ResourceErrors.Failed;
  }
}

export class ResourceForbiddenError extends BaseError {
  constructor() {
    super(
      `You do not have permission to access this resource`,
      HttpStatus.FORBIDDEN,
    );
    this.name = ResourceErrors.Forbidden;
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(resourceName: string) {
    super(
      `The specified ${resourceName.toLowerCase()} was not found`,
      HttpStatus.NOT_FOUND,
    );
    this.name = ResourceErrors.NotFound;
  }
}

export class ResourceUnauthorizedError extends BaseError {
  constructor() {
    super('Invalid authentication', HttpStatus.UNAUTHORIZED);
    this.name = ResourceErrors.Unauthorized;
  }
}

export class InternalResourceError extends BaseError {
  constructor() {
    super(
      "Something went wrong and that's all we know",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = ResourceErrors.InternalError;
  }
}
