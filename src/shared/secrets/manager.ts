import 'dotenv/config';
import { z } from 'zod';
import { InvalidSecretsError, SecretNotFoundError } from './errors';

const secretsSchema = z.object({
  ENVIRONMENT: z.string(),
  APP_PORT: z.number().positive(),
});

type Secrets = z.infer<typeof secretsSchema>;

export interface SecretsManagerGateway {
  getValue(secretName: keyof Secrets): string | number;
}

export class LocalSecretsManager implements SecretsManagerGateway {
  private secrets: Secrets;

  constructor() {
    const secrets = secretsSchema.safeParse({
      ENVIRONMENT: process.env.NODE_ENV,
      APP_PORT: Number(process.env.APP_PORT),
    });
    if (!secrets.success) {
      throw new InvalidSecretsError(secrets.error.message);
    }
    this.secrets = secrets.data;
  }

  public getValue(secretName: keyof Secrets): string | number {
    const secret = this.secrets[secretName];
    if (!secret) {
      throw new SecretNotFoundError(secretName);
    }
    return secret;
  }
}
