import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge/module';
import { ExceptionsModule } from 'core/exceptions/module';

@Module({
  imports: [ExceptionsModule, EventBridgeModule],
})
export class RootModule {}
