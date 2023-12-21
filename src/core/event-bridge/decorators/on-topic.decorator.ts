import { CustomDecorator, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { EventBridge } from '../core/types';

type OnTopicDecorator = ((topics: string) => CustomDecorator) & {
  KEY: string;
};

export const OnTopic = DiscoveryService.createDecorator() as OnTopicDecorator;

export class OnTopicDiscovery implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly eventBridge: EventBridge,
  ) {}

  public async onModuleInit(): Promise<void> {
    const actions = this.discoveryService.getProviders({
      metadataKey: OnTopic.KEY,
    });
    for (const action of actions) {
      const topic = this.discoveryService.getMetadataByDecorator(
        OnTopic,
        action,
      ) as string;
      this.eventBridge.register(topic, action.instance);
    }
  }
}
