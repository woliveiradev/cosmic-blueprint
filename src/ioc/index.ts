import { Module } from '@nestjs/common';
import { ContextModule } from 'core/context/ioc';
import { EventBridgeModule } from 'core/event-bridge/ioc';
import { ExceptionsModule } from 'core/exceptions/ioc';

@Module({
  imports: [ContextModule, ExceptionsModule, EventBridgeModule],
})
export class RootModule {}
