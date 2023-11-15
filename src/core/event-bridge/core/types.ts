import { Event } from '../event/event.bridge';
import { EventTopic } from '../event/types';

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
    topic: EventTopic,
    action: EventAction,
    condition?: EventActionCondition,
  ): void;
  topicRegistered(topic: EventTopic): boolean;
}