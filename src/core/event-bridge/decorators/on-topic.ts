import { EventBridgeImpl } from '../bridge';
import { EventTopic } from '../../domain/types';

export function OnTopic(topic: EventTopic): ClassDecorator {
  return function (Handler: any) {
    const handler = new Handler();
    const eventBridge = new EventBridgeImpl();
    eventBridge.subscribe(topic, handler);
  };
}
