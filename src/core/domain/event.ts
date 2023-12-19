import { DomainEventMessage } from './types';
import { Event } from 'core/event-bridge/event';

export abstract class DomainEvent<Message = unknown> extends Event<
  Message & DomainEventMessage
> {}
