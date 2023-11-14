export type EventTopic = string;

export type EventCorrelationId = string;

export type EventIdempotencyKey = string;

export interface EventMessage {}

export interface EventMetadata {
  readonly idempotencyKey: EventIdempotencyKey;
  readonly correlationId?: EventCorrelationId; // CorrelationId can be use for integration events, logs groups etc
  readonly timestamp: Date;
}
