import { EventTopic } from '../domain/types';
import { DomainEvent, EventHandler } from '../domain/event';
import { EventBridge } from './types';
import { Singleton } from '../decorators/singleton';

@Singleton
export class EventBridgeImpl implements EventBridge {
  private handlers: Map<EventTopic, EventHandler[]> = new Map();

  public publish(event: DomainEvent): void {
    const handlers = this.handlers.get(event.topic) || [];
    handlers.map((handler) => handler.handle(event));
  }

  public subscribe(topic: EventTopic, handler: EventHandler): void {
    const handlers = this.handlers.get(topic) || [];
    handlers.push(handler);
    this.handlers.set(topic, handlers);
  }
}
