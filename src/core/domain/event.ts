import { DomainEventMessage } from './types';
import { EventCorrelationId, EventTopic } from 'core/bus/event/types';
import { Event } from 'core/bus';

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
