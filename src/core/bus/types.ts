import { Event } from './event/event.bus';

export type EventTopic = string;

export type EventCorrelationId = string;

export type EventIdempotencyKey = string;

export interface EventMessage {}

export interface EventMetadata {
  readonly idempotencyKey: EventIdempotencyKey;
  readonly correlationId?: EventCorrelationId; // CorrelationId can be use for integration events, logs groups etc
  readonly timestamp: Date;
}

export interface EventAction {
  run(event: Event): Promise<void>;
}

export type EventFilter<EventMessage = unknown> = (
  event: Event<EventMessage>,
) => boolean;

export interface BusAction {
  action: EventAction;
  filter?: EventFilter;
}
