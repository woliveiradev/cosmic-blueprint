import { ResourceError } from './resource.error';

export class ResourceUnauthorizedError extends ResourceError {
  constructor() {
    super('Invalid authentication');
    this.name = 'RESOURCE_UNAUTHORIZED';
  }
}
