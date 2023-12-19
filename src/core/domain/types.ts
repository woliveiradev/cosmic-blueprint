export interface BaseEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEntityProps<Props> extends BaseEntityProps {
  props: Props;
}

export interface DomainEventMessage {
  readonly aggregateId: string;
}

export interface EventMetadata {
  readonly signatureKey: string;
  readonly timestamp: Date;
}
