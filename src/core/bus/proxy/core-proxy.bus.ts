import { EventBus } from '../bus';
import { Event } from '../event/event.bus';
import { InvalidTopicFormat, TopicNotRegistered } from '../exceptions';
import { EventAction, EventFilter } from '../types';

export class BusCoreProxy implements EventBus {
  constructor(private readonly busCore: EventBus) {}

  public register(
    topic: string,
    action: EventAction,
    filter?: EventFilter,
  ): void {
    /*
      A topic will only be accepted if it follows the "Planet.EarthPlanet" or "Planet.*" pattern.
      Words follow the Pascal Case pattern.
    */
    const topicRules = /^[A-Z][a-zA-Z]+\.[A-Z][a-zA-Z]+$|^[a-zA-Z]+\.\*$/;
    if (!topicRules.test(topic)) throw new InvalidTopicFormat();
    this.busCore.register(topic, action, filter);
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
