export class ContextNotFound extends Error {
  constructor() {
    super('Context not found, please check if it is being started');
  }
}
