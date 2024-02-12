export class InvalidSecretsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = InvalidSecretsException.name;
  }
}
