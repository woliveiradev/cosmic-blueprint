export class RequestContextNotFound extends Error {
  constructor() {
    super('Request context not found, please check if it is being started');
  }
}
