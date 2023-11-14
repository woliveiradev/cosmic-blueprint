import { Event } from './event/event.bus';
import { EventAction, EventFilter, EventTopic } from './types';

export interface EventRouter {
  register(topic: EventTopic, action: EventAction, filter?: EventFilter): void;
}

export interface EventPublisher {
  publish(event: Event): void;
}

export interface EventBus extends EventRouter, EventPublisher {
  topicRegistered(topic: EventTopic): boolean;
}
