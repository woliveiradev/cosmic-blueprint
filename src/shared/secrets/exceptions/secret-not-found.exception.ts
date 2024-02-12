export class SecretNotFoundException extends Error {
  constructor(secretName: string) {
    super(`The secret ${secretName} was not found`);
    this.name = SecretNotFoundException.name;
  }
}
