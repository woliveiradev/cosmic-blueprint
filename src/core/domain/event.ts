import { createHash, randomUUID } from 'crypto';
import { DomainEventMessage, EventMetadata, EventType } from './types';

export abstract class DomainEvent<Message = object> {
  public readonly eventType: EventType;
  public readonly message: Message;
  public readonly metadata: EventMetadata;

  protected constructor(
    eventType: EventType,
    message: Message & DomainEventMessage,
  ) {
    this.eventType = eventType;
    this.message = message;
    const timestamp = new Date();
    const key = `${randomUUID()}.${eventType}.${timestamp}`;
    this.metadata = {
      signatureKey: createHash('md5').update(key).digest('hex'),
      timestamp,
    };
  }
}
