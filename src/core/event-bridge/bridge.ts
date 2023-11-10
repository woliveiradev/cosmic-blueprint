import { EventBridge, EventTopic } from './types';
import { Singleton } from '../decorators/singleton';
import { Event, EventHandler } from './event';

@Singleton
class EventBridgeImpl implements EventBridge {
  private handlers: Map<EventTopic, EventHandler[]> = new Map();

  public publish(event: Event): void {
    const handlers = this.handlers.get(event.topic) || [];
    handlers.map((handler) => handler.handle(event));
  }

  public subscribe(topic: EventTopic, handler: EventHandler): void {
    const handlers = this.handlers.get(topic) || [];
    handlers.push(handler);
    this.handlers.set(topic, handlers);
  }
}

export const eventBridge = new EventBridgeImpl();
