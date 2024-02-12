import { Module } from '@nestjs/common';
import { LocalSecretsManager } from './manager';

export const SECRETS_MANAGER_TOKEN = Symbol('SECRETS_MANAGER');

@Module({
  imports: [],
  providers: [
    {
      provide: SECRETS_MANAGER_TOKEN,
      useClass: LocalSecretsManager,
    },
  ],
  exports: [SECRETS_MANAGER_TOKEN],
})
export class SecretsModule {}
