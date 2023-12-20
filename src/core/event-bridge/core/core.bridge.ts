import { Logger } from 'core/logger';
import { Event } from '../event/event.bridge';
import { withWildcard } from './utils/with-wildcard.util';
import { EventAction, EventBridge } from './types';

export class BridgeCore implements EventBridge {
  private readonly router: Map<string, EventAction[]> = new Map();

  constructor(private readonly logger: Logger) {}

  public register(topic: string, action: EventAction): void {
    const actions = this.router.get(topic) ?? [];
    actions.push(action);
    this.router.set(topic, actions);
    this.logger.debug(`Action registered for topic: ${topic}`);
  }

  private async processAction(event: Event, action: EventAction) {
    await action.run(event);
    this.logger.info(
      `Action ${action.name} processed for topic: ${event.topic}`,
    );
  }

  private getActionsFromTopic(topic: string): EventAction[] {
    const [mainTopic] = topic.split('.');
    return [topic, withWildcard(mainTopic)].flatMap((topic) => {
      return this.router.get(topic) ?? [];
    });
  }

  public publish(event: Event): void {
    const actions = this.getActionsFromTopic(event.topic);
    this.logger.info(`New event published for topic: ${event.topic}`);
    actions.forEach((action) => {
      this.processAction(event, action);
    });
  }

  public topicRegistered(topic: string): boolean {
    const actions = this.getActionsFromTopic(topic);
    return actions.length > 0;
  }
}
