import { ResourceError } from './resource.error';

export class ResourceFailedError extends ResourceError<string | string[]> {
  constructor(message: string | string[]) {
    super(message);
    this.name = 'RESOURCE_FAILED';
  }
}
