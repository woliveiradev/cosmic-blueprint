import { Event } from '../event/event.bridge';
import { eventTopicRules, topicRules } from './constants';
import { InvalidTopicFormat } from './exceptions/invalid-topic-format.exception';
import { TopicNotRegistered } from './exceptions/topic-not-registered.exception';
import { EventAction, EventBridge } from './types';

export class BridgeCoreProxy implements EventBridge {
  constructor(private readonly bridgeCore: EventBridge) {}

  public register(topic: string, action: EventAction): void {
    /*
      A topic will only be accepted if it follows the "Planet.EarthPlanet"
      or "Planet.*" pattern. Words follow the Pascal Case pattern.
    */
    if (!topicRules.test(topic)) throw new InvalidTopicFormat();
    this.bridgeCore.register(topic, action);
  }

  public publish(event: Event): void {
    if (!this.topicRegistered(event.topic)) {
      throw new TopicNotRegistered(event.topic);
    }
    /*
      A event Topic cannot contain a wildcard
    */
    if (!eventTopicRules.test(event.topic)) {
      throw new InvalidTopicFormat();
    }
    this.bridgeCore.publish(event);
  }

  public topicRegistered(topic: string): boolean {
    return this.bridgeCore.topicRegistered(topic);
  }
}
