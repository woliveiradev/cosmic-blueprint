import { DomainEventMessage, EventMetadata, EventTopic } from './types';

export abstract class DomainEvent<
  Message extends DomainEventMessage = DomainEventMessage,
> {
  public readonly topic: EventTopic;
  public readonly message: Message;
  public readonly metadata: EventMetadata;

  protected constructor(topic: EventTopic, message: Message) {
    this.topic = topic;
    this.message = message;
    this.metadata = {
      timestamp: new Date(),
    };
  }
}

export interface EventHandler<TEvent = Event> {
  handle(event: TEvent): Promise<void>;
}
