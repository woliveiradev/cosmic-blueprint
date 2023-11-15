import { Event } from '../event/event.bus';
import { EventTopic } from '../event/types';
import { Action, EventAction, EventActionCondition, EventBus } from './types';

export class BusCore implements EventBus {
  private readonly router: Map<EventTopic, Action[]> = new Map();

  public register<EventMessage>(
    topic: EventTopic,
    action: EventAction,
    condition?: EventActionCondition<EventMessage>,
  ): void {
    const busActions = this.router.get(topic) ?? [];
    busActions.push({ action, condition });
    this.router.set(topic, busActions);
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
