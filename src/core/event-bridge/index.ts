import { EventBridgeImpl } from './bridge';
export * from './bridge';
export * from './decorators/on-topic';
export const eventBridge = new EventBridgeImpl();
