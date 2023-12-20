import { Event } from '../event/event.bridge';

export interface EventAction {
  readonly name: string;
  run(event: Event): Promise<void>;
}

export interface EventPublisher {
  publish(event: Event): void;
}

export interface EventBridge extends EventPublisher {
  register(topic: string, action: EventAction): void;
  topicRegistered(topic: string): boolean;
}
