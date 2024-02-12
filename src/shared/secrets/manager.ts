import 'dotenv/config';
import { z } from 'zod';
import { InvalidSecretsError, SecretNotFoundError } from './errors';

const secretsSchema = z.object({
  ENVIRONMENT: z.string(),
});

type Secrets = z.infer<typeof secretsSchema>;

export interface SecretsManager {
  getValue(secretName: keyof Secrets): string;
}

export class LocalSecretsManager implements SecretsManager {
  private secrets: Secrets;

  constructor() {
    const secrets = secretsSchema.safeParse({
      ENVIRONMENT: process.env.Data,
    });
    if (!secrets.success) {
      throw new InvalidSecretsError(secrets.error.message);
    }
    this.secrets = secrets.data;
  }

  public getValue(secretName: keyof Secrets): string {
    const secret = this.secrets[secretName];
    if (!secret) {
      throw new SecretNotFoundError(secretName);
    }
    return secret;
  }
}
