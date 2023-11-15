import { Event } from '../event/event.bridge';
import { topicRules } from './constants';
import { InvalidTopicFormat } from './exceptions/invalid-topic-format.exception';
import { TopicNotRegistered } from './exceptions/topic-not-registered.exception';
import { EventAction, EventActionCondition, EventBridge } from './types';

export class BridgeCoreProxy implements EventBridge {
  constructor(private readonly bridgeCore: EventBridge) {}

  public register(
    topic: string,
    action: EventAction,
    condition?: EventActionCondition,
  ): void {
    /*
      A topic will only be accepted if it follows the "Planet.EarthPlanet"
      or "Planet.*" pattern. Words follow the Pascal Case pattern.
    */
    if (!topicRules.test(topic)) throw new InvalidTopicFormat();
    this.bridgeCore.register(topic, action, condition);
  }

  public publish(event: Event): void {
    if (!this.topicRegistered(event.topic)) {
      throw new TopicNotRegistered(event.topic);
    }
    this.bridgeCore.publish(event);
  }

  public topicRegistered(topic: string): boolean {
    return this.bridgeCore.topicRegistered(topic);
  }
}
