import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { BridgeCoreProxy } from './core/core-proxy.bridge';
import { BridgeCore } from './core/core.bridge';
import { EventBridge } from './core/types';
import { LOGGER_TOKEN, Logger } from 'core/logger';
import { OnTopicDiscovery } from './decorators/on-topic.decorator';

export const EVENT_BRIDGE_TOKEN = Symbol('EVENT_BRIDGE');
const BRIDGE_CORE_TOKEN = Symbol('BRIDGE_CORE');
const ON_TOPIC_TOKEN = Symbol('ON_TOPIC');

@Module({
  imports: [DiscoveryModule],
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
    {
      provide: ON_TOPIC_TOKEN,
      useFactory: (
        discoveryService: DiscoveryService,
        eventBridge: EventBridge,
      ) => {
        return new OnTopicDiscovery(discoveryService, eventBridge);
      },
      inject: [DiscoveryService, EVENT_BRIDGE_TOKEN],
    },
  ],
  exports: [EVENT_BRIDGE_TOKEN],
})
export class EventBridgeModule {}
