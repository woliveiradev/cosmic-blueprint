import { Module } from '@nestjs/common';
import { SecretsModule } from 'shared/secrets';

@Module({
  imports: [SecretsModule],
})
export class RootModule {}
