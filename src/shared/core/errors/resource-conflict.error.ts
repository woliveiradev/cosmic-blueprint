import { ResourceError } from './resource.error';

export class ResourceConflictError extends ResourceError {
  constructor(resourceName: string) {
    super(`The specified ${resourceName.toLowerCase()} already exists`);
    this.name = 'RESOURCE_CONFLICT';
  }
}
