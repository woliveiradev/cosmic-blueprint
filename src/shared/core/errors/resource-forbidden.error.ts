import { ResourceError } from './resource.error';

export class ResourceForbidden extends ResourceError {
  constructor() {
    super(`You do not have permission to access this resource`);
    this.name = 'RESOURCE_FORBIDDEN';
  }
}
