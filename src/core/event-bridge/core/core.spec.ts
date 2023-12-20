import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BridgeCore } from './core.bridge';
import { Event } from '../event/event.bridge';
import { EventActionStub } from './stubs/event-action.stub';
import { EventAction } from './types';
import { LoggerStub } from 'core/logger/stubs/logger.stub';
import { randomUUID } from 'crypto';

let event: Event;
let eventActionStub: EventAction;
let bridgeCore: BridgeCore;

beforeEach(() => {
  event = new Event('Test.EventEmitted', {}, randomUUID());
  const logger = new LoggerStub();
  bridgeCore = new BridgeCore(logger);
  eventActionStub = new EventActionStub();
});

describe('Bridge Core Register Route', () => {
  it('should be able to register a topic when sending valid topic format', () => {
    const validTopic = 'Test.EventEmitted';
    const result = bridgeCore.register(validTopic, eventActionStub);
    expect(bridgeCore.topicRegistered(validTopic)).toBeTruthy();
    expect(result).toBeUndefined();
  });
});

describe('Bridge Core Publish Event', () => {
  it('should be able to run a action when registed topic contains wildcard', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    bridgeCore.register('Test.*', eventActionStub);
    bridgeCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });
});

describe('Bridge Core Topic Registered', () => {
  it('should be able to return true when registered topic contains a wildcard', () => {
    const registeredTopic = 'Test.*';
    bridgeCore.register(registeredTopic, eventActionStub);
    const result = bridgeCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });

  it('should be able to return true when registered topic is exactly the same', () => {
    const registeredTopic = 'Test.EventEmitted';
    bridgeCore.register(registeredTopic, eventActionStub);
    const result = bridgeCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });
});
