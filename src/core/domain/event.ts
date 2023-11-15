import { DomainEventMessage } from './types';
import { Event, EventCorrelationId, EventTopic } from 'core/bus/event';

export abstract class DomainEvent<Message = unknown> extends Event<
  Message & DomainEventMessage
> {
  constructor(
    topic: EventTopic,
    message: Message & DomainEventMessage,
    correlationId?: EventCorrelationId,
  ) {
    super(topic, message, correlationId);
  }
}
