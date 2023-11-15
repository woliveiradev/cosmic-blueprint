import { Event } from '../event/event.bridge';
import { EventTopic } from '../event/types';
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

  public publish(event: Event): void {
    const [mainTopic] = event.topic.split('.');
    const wildcardTopic = `${mainTopic}.*`;
    const actions = this.router.get(event.topic) ?? [];
    const wildcardActions = this.router.get(wildcardTopic) ?? [];
    actions.forEach(({ action, condition }) => {
      this.processAction(event, action, condition);
    });
    wildcardActions.forEach(({ action, condition }) => {
      this.processAction(event, action, condition);
    });
  }

  public topicRegistered(topic: EventTopic): boolean {
    const [mainTopic] = topic.split('.');
    const hasEqualTopic = this.router.has(topic);
    const hasWildcardTopic = this.router.has(`${mainTopic}.*`);
    return hasEqualTopic || hasWildcardTopic;
  }
}
