import { HttpException, HttpStatus } from '@nestjs/common';

export enum ResourceErrors {
  CONFLICT = 'RESOURCE_CONFLICT',
  FAILED = 'RESOURCE_FAILED',
  FORBIDDEN = 'RESOURCE_FORBIDDEN',
  NOT_FOUND = 'RESOURCE_NOT_FOUND',
  UNAUTHORIZED = 'RESOURCE_UNAUTHORIZED',
  INTERNAL_ERROR = 'INTERNAL_RESOURCE_ERROR',
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
    this.name = ResourceErrors.CONFLICT;
  }
}

export class ResourceFailedError extends BaseError {
  constructor(message: string | string[]) {
    super(message as string, HttpStatus.BAD_REQUEST);
    this.name = ResourceErrors.FAILED;
  }
}

export class ResourceForbiddenError extends BaseError {
  constructor() {
    super(
      `You do not have permission to access this resource`,
      HttpStatus.FORBIDDEN,
    );
    this.name = ResourceErrors.FORBIDDEN;
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(resourceName: string) {
    super(
      `The specified ${resourceName.toLowerCase()} was not found`,
      HttpStatus.NOT_FOUND,
    );
    this.name = ResourceErrors.NOT_FOUND;
  }
}

export class ResourceUnauthorizedError extends BaseError {
  constructor() {
    super('Invalid authentication', HttpStatus.UNAUTHORIZED);
    this.name = ResourceErrors.UNAUTHORIZED;
  }
}

export class InternalResourceError extends BaseError {
  constructor() {
    super(
      "Something went wrong and that's all we know",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.name = ResourceErrors.INTERNAL_ERROR;
  }
}
