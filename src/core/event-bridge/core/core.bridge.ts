import { Logger } from 'core/logger';
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

  constructor(private readonly logger: Logger) {}

  public register<EventMessage>(
    topic: EventTopic,
    action: EventAction,
    condition?: EventActionCondition<EventMessage>,
  ): void {
    const actions = this.router.get(topic) ?? [];
    actions.push({ action, condition });
    this.router.set(topic, actions);
    this.logger.debug(`Action registered for topic: ${topic}`);
  }

  private async processAction(
    event: Event,
    action: EventAction,
    condition?: EventActionCondition,
  ) {
    if (condition && !condition(event)) return;
    await action.run(event);
    this.logger.info(`Action processed for topic: ${event.topic}`);
  }

  private getActionsFromTopic(topic: EventTopic): Action[] {
    const [mainTopic] = topic.split('.');
    return [topic, withWildcard(mainTopic)].flatMap((topic) => {
      return this.router.get(topic) ?? [];
    });
  }

  public publish(event: Event): void {
    const actions = this.getActionsFromTopic(event.topic);
    this.logger.info(`New event published for topic: ${event.topic}`);
    actions.forEach(({ action, condition }) => {
      this.processAction(event, action, condition);
    });
  }

  public topicRegistered(topic: EventTopic): boolean {
    const actions = this.getActionsFromTopic(topic);
    return actions.length > 0;
  }
}
