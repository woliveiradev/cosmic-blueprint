import { ResourceFailedError, ResourceNotFoundError } from '../core/errors';

export class InvalidSecretsError extends ResourceFailedError {
  constructor(errors: string) {
    super(`The following application secrets are invalid: ${errors}`);
  }
}

export class SecretNotFoundError extends ResourceNotFoundError {
  constructor(secretName: string) {
    super(`secret ${secretName}`);
  }
}
