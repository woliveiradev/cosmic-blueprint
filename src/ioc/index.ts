import { Module } from '@nestjs/common';
import { eventBridge } from 'core/event-bridge';
import { EVENT_BRIDGE_TOKEN } from './tokens';

@Module({
  providers: [
    {
      provide: EVENT_BRIDGE_TOKEN,
      useValue: eventBridge,
    },
  ],
})
export class RootModule {}
