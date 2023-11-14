import { EventBus } from '../bus';
import { Event } from '../event/event.bus';
import { EventTopic } from '../event/types';
import { BusAction, EventAction, ActionFilter } from './types';

export class BusCore implements EventBus {
  private readonly router: Map<EventTopic, BusAction[]> = new Map();

  public register<EventMessage>(
    topic: EventTopic,
    action: EventAction,
    filter?: ActionFilter<EventMessage>,
  ): void {
    const busActions = this.router.get(topic) ?? [];
    busActions.push({ action, filter });
    this.router.set(topic, busActions);
  }

  private async processAction(
    event: Event,
    action: EventAction,
    filter?: ActionFilter,
  ) {
    if (filter && !filter(event)) return;
    await action.run(event);
  }

  public publish(event: Event): void {
    const [mainTopic] = event.topic.split('.');
    const wildcardTopic = `${mainTopic}.*`;
    const actions = this.router.get(event.topic) ?? [];
    const wildcardActions = this.router.get(wildcardTopic) ?? [];
    actions.forEach(({ action, filter }) => {
      this.processAction(event, action, filter);
    });
    wildcardActions.forEach(({ action, filter }) => {
      this.processAction(event, action, filter);
    });
  }

  public topicRegistered(topic: EventTopic): boolean {
    const [mainTopic] = topic.split('.');
    const hasEqualTopic = this.router.has(topic);
    const hasWildcardTopic = this.router.has(`${mainTopic}.*`);
    return hasEqualTopic || hasWildcardTopic;
  }
}
