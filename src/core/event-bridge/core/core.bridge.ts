import { Event } from '../event/event.bridge';
import { EventTopic } from '../event/types';
import { withWildcard } from './utils/with-wildcard.util';
import {
  Action,
  EventAction,
  EventActionCondition,
  EventBridge,
} from './types';

export class BridgeCore implements EventBridge {
  private readonly router: Map<EventTopic, Action[]> = new Map();

  public register<EventMessage>(
    topic: EventTopic,
    action: EventAction,
    condition?: EventActionCondition<EventMessage>,
  ): void {
    const actions = this.router.get(topic) ?? [];
    actions.push({ action, condition });
    this.router.set(topic, actions);
  }

  private async processAction(
    event: Event,
    action: EventAction,
    condition?: EventActionCondition,
  ) {
    if (condition && !condition(event)) return;
    await action.run(event);
  }

  private getActions(topics: EventTopic[]): Action[] {
    return topics.flatMap((topic) => {
      return this.router.get(topic) || [];
    });
  }

  public publish(event: Event): void {
    const [mainTopic] = event.topic.split('.');
    const actions = this.getActions([event.topic, withWildcard(mainTopic)]);
    actions.forEach(({ action, condition }) => {
      this.processAction(event, action, condition);
    });
  }

  public topicRegistered(topic: EventTopic): boolean {
    const [mainTopic] = topic.split('.');
    const actions = this.getActions([topic, withWildcard(mainTopic)]);
    return actions.length > 0;
  }
}
