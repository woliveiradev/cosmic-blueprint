import { EventAction, ActionFilter } from './core/types';
import { Event } from './event/event.bus';
import { EventTopic } from './event/types';

export interface EventRouter {
  register(topic: EventTopic, action: EventAction, filter?: ActionFilter): void;
}

export interface EventPublisher {
  publish(event: Event): void;
}

export interface EventBus extends EventRouter, EventPublisher {
  topicRegistered(topic: EventTopic): boolean;
}
