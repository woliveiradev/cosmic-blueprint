import { Global, Module } from '@nestjs/common';
import { BridgeCoreProxy } from '../core/core-proxy.bridge';
import { BridgeCore } from '../core/core.bridge';
import { BRIDGE_CORE, EVENT_BRIDGE } from './tokens';

@Global()
@Module({
  providers: [
    {
      provide: BRIDGE_CORE,
      useClass: BridgeCore,
    },
    {
      provide: EVENT_BRIDGE,
      useFactory: (bridgeCore) => {
        return new BridgeCoreProxy(bridgeCore);
      },
      inject: [BRIDGE_CORE],
    },
  ],
  exports: [EVENT_BRIDGE],
})
export class EventBridgeModule {}
