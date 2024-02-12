export abstract class BaseError extends Error {
  public readonly timestamp: Date;
  constructor(message: string) {
    super(message);
    this.timestamp = new Date();
  }
}

export class ResourceConflictError extends BaseError {
  constructor(resourceName: string) {
    super(`The specified ${resourceName.toLowerCase()} already exists`);
    this.name = 'RESOURCE_CONFLICT';
  }
}

export class ResourceFailedError extends BaseError {
  constructor(message: string | string[]) {
    super(message as string);
    this.name = 'RESOURCE_FAILED';
  }
}

export class ResourceForbiddenError extends BaseError {
  constructor() {
    super(`You do not have permission to access this resource`);
    this.name = 'RESOURCE_FORBIDDEN';
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(resourceName: string) {
    super(`The specified ${resourceName.toLowerCase()} was not found`);
    this.name = 'RESOURCE_NOT_FOUND';
  }
}

export class ResourceUnauthorizedError extends BaseError {
  constructor() {
    super('Invalid authentication');
    this.name = 'RESOURCE_UNAUTHORIZED';
  }
}
