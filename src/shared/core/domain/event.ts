export interface DomainEventMessage {
  readonly aggregateId: string;
}

export abstract class DomainEvent<Message = unknown> {
  public readonly topic: string;
  public readonly message: Message & DomainEventMessage;
  public readonly timestamp: Date;

  constructor(topic: string, message: Message & DomainEventMessage) {
    this.topic = topic;
    this.message = message;
    this.timestamp = new Date();
    Object.freeze(this);
  }
}
