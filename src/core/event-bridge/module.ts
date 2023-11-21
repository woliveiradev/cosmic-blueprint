import { Module } from '@nestjs/common';
import { BridgeCoreProxy } from './core/core-proxy.bridge';
import { BridgeCore } from './core/core.bridge';
import { EventBridge } from './core/types';

export const BRIDGE_CORE_TOKEN = Symbol('BRIDGE_CORE');
export const EVENT_BRIDGE_TOKEN = Symbol('EVENT_BRIDGE');

@Module({
  providers: [
    {
      provide: BRIDGE_CORE_TOKEN,
      useClass: BridgeCore,
    },
    {
      provide: EVENT_BRIDGE_TOKEN,
      useFactory: (bridgeCore: EventBridge) => {
        return new BridgeCoreProxy(bridgeCore);
      },
      inject: [BRIDGE_CORE_TOKEN],
    },
  ],
  exports: [BRIDGE_CORE_TOKEN],
})
export class EventBridgeModule {}
