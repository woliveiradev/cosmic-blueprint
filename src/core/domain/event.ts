import { DomainEventMessage, DomainEventMetadata, EventTopic } from './types';

export abstract class DomainEvent<
  Message extends DomainEventMessage = DomainEventMessage,
> {
  public readonly topic: EventTopic;
  public readonly message: Message;
  public readonly metadata: DomainEventMetadata;

  constructor(topic: EventTopic, message: Message) {
    this.topic = topic;
    this.message = message;
    this.metadata = {
      timestamp: new Date(),
    };
  }
}

export interface EventHandler<Event extends DomainEvent = DomainEvent> {
  handle(event: Event): Promise<void>;
}
