import { Event } from '../event-bridge/event';
import { DomainEventMessage } from './types';

export abstract class DomainEvent<Message = DomainEventMessage> extends Event<
  Message & DomainEventMessage
> {}
