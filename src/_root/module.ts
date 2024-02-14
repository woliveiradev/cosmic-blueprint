import { Module } from '@nestjs/common';
import { HttpModule } from 'shared/http';
import { SecretsModule } from 'shared/secrets';

@Module({
  imports: [SecretsModule, HttpModule],
})
export class RootModule {}
