import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge/ioc';
import { ExceptionsModule } from 'core/exceptions/ioc';

@Module({
  imports: [ExceptionsModule, EventBridgeModule],
})
export class RootModule {}
