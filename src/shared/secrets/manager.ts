import 'dotenv/config';
import { z } from 'zod';
import { InvalidSecretsException, SecretNotFoundException } from './exceptions';

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
      ENVIRONMENT: process.env.NODE_ENV,
    });
    if (!secrets.success) {
      throw new InvalidSecretsException(
        secrets.error.message as unknown as string,
      );
    }
    this.secrets = secrets.data;
  }

  public getValue(secretName: keyof Secrets): string {
    const secret = this.secrets[secretName];
    if (!secret) {
      throw new SecretNotFoundException(secretName);
    }
    return secret;
  }
}
