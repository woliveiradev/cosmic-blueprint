import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge/ioc';

@Module({
  imports: [EventBridgeModule],
})
export class RootModule {}
