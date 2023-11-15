import { Event } from '../event/event.bus';
import { InvalidTopicFormat } from './exceptions/invalid-topic-format.exception';
import { TopicNotRegistered } from './exceptions/topic-not-registered.exception';
import { EventAction, EventActionCondition, EventBus } from './types';

export class BusCoreProxy implements EventBus {
  constructor(private readonly busCore: EventBus) {}

  public register(
    topic: string,
    action: EventAction,
    condition?: EventActionCondition,
  ): void {
    /*
      A topic will only be accepted if it follows the "Planet.EarthPlanet" or "Planet.*" pattern.
      Words follow the Pascal Case pattern.
    */
    const topicRules = /^[A-Z][a-zA-Z]+\.[A-Z][a-zA-Z]+$|^[a-zA-Z]+\.\*$/;
    if (!topicRules.test(topic)) throw new InvalidTopicFormat();
    this.busCore.register(topic, action, condition);
  }

  public publish(event: Event): void {
    if (!this.topicRegistered(event.topic)) {
      throw new TopicNotRegistered(event.topic);
    }
    this.busCore.publish(event);
  }

  public topicRegistered(topic: string): boolean {
    return this.busCore.topicRegistered(topic);
  }
}
