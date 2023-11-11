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

export type EventType = string;

export interface EventMetadata {
  readonly signatureKey: Identity;
  readonly timestamp: Date;
}
