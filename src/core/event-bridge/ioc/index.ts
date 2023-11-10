import { Global, Module } from '@nestjs/common';
import { EVENT_BRIDGE_TOKEN } from './tokens';
import { eventBridge } from '../bridge';

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BRIDGE_TOKEN,
      useValue: eventBridge,
    },
  ],
  exports: [EVENT_BRIDGE_TOKEN],
})
export class EventBridgeModule {}
