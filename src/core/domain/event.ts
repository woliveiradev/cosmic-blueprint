import { DomainEventMessage, EventMetadata, EventType } from './types';

export abstract class DomainEvent<Message = any> {
  public readonly eventType: EventType;
  public readonly message: Message;
  public readonly metadata: EventMetadata;

  protected constructor(
    eventType: EventType,
    message: Message & DomainEventMessage,
  ) {
    this.eventType = eventType;
    this.message = message;
    this.metadata = {
      timestamp: new Date(),
    };
  }
}
