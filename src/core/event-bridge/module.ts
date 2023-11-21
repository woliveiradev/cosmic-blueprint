import { Module } from '@nestjs/common';
import { BridgeCoreProxy } from './core/core-proxy.bridge';
import { BridgeCore } from './core/core.bridge';
import { EventBridge } from './core/types';
import { LOGGER_TOKEN, Logger } from 'core/logger';

export const BRIDGE_CORE_TOKEN = Symbol('BRIDGE_CORE');
export const EVENT_BRIDGE_TOKEN = Symbol('EVENT_BRIDGE');

@Module({
  providers: [
    {
      provide: BRIDGE_CORE_TOKEN,
      useFactory: (logger: Logger) => {
        return new BridgeCore(logger);
      },
      inject: [LOGGER_TOKEN],
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
