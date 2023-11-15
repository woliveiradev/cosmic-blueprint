import { Event } from '../event/event.bus';
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

export interface EventBus extends EventPublisher {
  register(
    topic: EventTopic,
    action: EventAction,
    condition?: EventActionCondition,
  ): void;
  topicRegistered(topic: EventTopic): boolean;
}
