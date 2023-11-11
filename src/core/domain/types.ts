import { EventHandler } from './event';

export type Identity = string;

export interface BaseEntityProps {
  id?: Identity;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEntityProps<Props> extends BaseEntityProps {
  props: Props;
}

export interface DomainEventMessage {
  readonly aggregateId: Identity;
}

export type EventTopic = string;

export interface EventBridge {
  publish(event: Event): void;
  subscribe(topic: EventTopic, handler: EventHandler): void;
}

export interface EventMetadata {
  readonly timestamp: Date;
}
