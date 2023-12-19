import { Event } from '../event/event.bridge';

export interface EventAction {
  run(event: Event): Promise<void>;
}

export type EventActionCondition<EventMessage = unknown> = (
  event: Event<EventMessage>,
) => boolean;

export interface Action {
  action: EventAction;
  condition?: EventActionCondition;
}

export interface EventPublisher {
  publish(event: Event): void;
}

export interface EventBridge extends EventPublisher {
  register(
    topic: string,
    action: EventAction,
    condition?: EventActionCondition,
  ): void;
  topicRegistered(topic: string): boolean;
}
