import { randomUUID } from 'crypto';
import { EventMetadata, EventTopic } from './types';

export class Event<Message = unknown> {
  public readonly topic: EventTopic;
  public readonly message: Message;
  public readonly metadata: EventMetadata;

  constructor(topic: EventTopic, message: Message, correlationId?: string) {
    this.topic = topic;
    this.message = message;
    this.metadata = {
      idempotencyKey: randomUUID(),
      correlationId,
      timestamp: new Date(),
    };
  }
}
