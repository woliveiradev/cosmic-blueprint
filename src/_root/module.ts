import { Module } from '@nestjs/common';
import { HttpModule } from 'shared/http';
import { LoggersModule } from 'shared/logger';
import { SecretsModule } from 'shared/secrets';

@Module({
  imports: [SecretsModule, LoggersModule, HttpModule],
})
export class RootModule {}
