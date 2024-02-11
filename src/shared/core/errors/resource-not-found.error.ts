import { ResourceError } from './resource.error';

export class ResourceNotFoundError extends ResourceError {
  constructor(resourceName: string) {
    super(`The specified ${resourceName.toLowerCase()} was not found`);
    this.name = 'RESOURCE_NOT_FOUND';
  }
}
