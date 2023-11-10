import { eventBridge } from '../bridge';
import { EventTopic } from '../types';

export function OnTopic(topic: EventTopic): ClassDecorator {
  return function (Handler: any) {
    const handler = new Handler();
    eventBridge.subscribe(topic, handler);
  };
}
