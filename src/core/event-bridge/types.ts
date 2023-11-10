import { EventTopic } from '../domain/types';
import { DomainEvent, EventHandler } from '../domain/event';

export interface EventBridge {
  publish(event: DomainEvent): void;
  subscribe(topic: EventTopic, handler: EventHandler): void;
}
