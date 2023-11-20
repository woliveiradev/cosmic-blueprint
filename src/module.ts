import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge';
import { ExceptionsModule } from 'core/exceptions';
import { LoggerModule } from 'core/logger';
import { RequestContextModule } from 'core/request-context';

@Module({
  imports: [
    RequestContextModule,
    LoggerModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
