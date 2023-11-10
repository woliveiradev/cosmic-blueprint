import { Event, EventHandler } from './event';

export type EventTopic = string;

export interface EventBridge {
  publish(event: Event): void;
  subscribe(topic: EventTopic, handler: EventHandler): void;
}

export interface EventMetadata {
  readonly timestamp: Date;
}
