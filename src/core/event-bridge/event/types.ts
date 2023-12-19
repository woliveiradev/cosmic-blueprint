export interface EventMessage {}

export interface EventMetadata {
  readonly idempotencyKey: string;
  readonly correlationId?: string; // CorrelationId can be use for integration events, logs groups etc
  readonly timestamp: Date;
}
