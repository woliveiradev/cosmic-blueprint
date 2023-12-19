import { randomUUID } from 'crypto';
import { EventMetadata } from './types';

export class Event<Message = unknown> {
  public readonly topic: string;
  public readonly message: Message;
  public readonly metadata: EventMetadata;

  constructor(topic: string, message: Message, correlationId?: string) {
    this.topic = topic;
    this.message = message;
    this.metadata = {
      idempotencyKey: randomUUID(),
      correlationId,
      timestamp: new Date(),
    };
  }
}
