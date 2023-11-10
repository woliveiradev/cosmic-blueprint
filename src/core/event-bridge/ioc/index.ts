import { Global, Module } from '@nestjs/common';
import { EventBridgeImpl } from '../bridge';
import { EVENT_BRIDGE_TOKEN } from './tokens';

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BRIDGE_TOKEN,
      useClass: EventBridgeImpl,
    },
  ],
  exports: [EVENT_BRIDGE_TOKEN],
})
export class EventBridgeModule {}
