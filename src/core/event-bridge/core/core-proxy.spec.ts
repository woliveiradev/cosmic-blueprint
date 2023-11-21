import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BridgeCoreProxy } from './core-proxy.bridge';
import { BridgeCore } from './core.bridge';
import { Event } from '../event/event.bridge';
import { InvalidTopicFormat } from './exceptions/invalid-topic-format.exception';
import { TopicNotRegistered } from './exceptions/topic-not-registered.exception';
import { EventActionStub } from './stubs/event-action.stub';
import { LoggerStub } from 'core/logger/stubs/logger.stub';
import { EventAction } from './types';

let event: Event;
let bridgeCore: BridgeCore;
let bridgeCoreProxy: BridgeCoreProxy;
let eventActionStub: EventAction;

beforeEach(() => {
  event = new Event('Test.EventEmitted', {});
  const logger = new LoggerStub();
  bridgeCore = new BridgeCore(logger);
  bridgeCoreProxy = new BridgeCoreProxy(bridgeCore);
  eventActionStub = new EventActionStub();
});

describe('Bridge Core Proxy Validate Register Route', () => {
  it('should not be able to forward a register when trying register a new topic without split character (.)', () => {
    const invalidTopic = 'invalid format';
    expect(() =>
      bridgeCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when trying register a new topic with many split character (.)', () => {
    const invalidTopic = 'Many.Split.Character';
    expect(() =>
      bridgeCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when main topic is not PascalCase', () => {
    const invalidTopic = 'test.InvalidMainTopic';
    expect(() =>
      bridgeCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when sub topic is not PascalCase', () => {
    const invalidTopic = 'Test.invalid-sub-topic';
    expect(() =>
      bridgeCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should be able to forward a register when sub topic is wildcard', () => {
    const validTopic = 'Test.*';
    const registerSpy = vi.spyOn(bridgeCore, 'register');
    const result = bridgeCoreProxy.register(validTopic, eventActionStub);
    expect(result).toBeUndefined();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should be able to forward a register when main topic and sub topic have valid formats ', () => {
    const validTopic = 'Test.ValidTopic';
    const registerSpy = vi.spyOn(bridgeCore, 'register');
    const result = bridgeCoreProxy.register(validTopic, eventActionStub);
    expect(result).toBeUndefined();
    expect(registerSpy).toHaveBeenCalled();
  });
});

describe('Bridge Core Proxy Validate Publish Event', () => {
  it('should not be able to forward a event publish when topic is not registered', () => {
    expect(() => bridgeCoreProxy.publish(event)).toThrowError(
      new TopicNotRegistered(event.topic),
    );
  });

  it('should be able to forward a event publish when topic exists', () => {
    const actionSpy = vi.spyOn(bridgeCore, 'publish');
    bridgeCoreProxy.register(event.topic, eventActionStub);
    bridgeCoreProxy.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });
});

describe('Bridge Core Proxy Validate Topic State', () => {
  it('should be able to return true when event already has registered', () => {
    bridgeCoreProxy.register(event.topic, eventActionStub);
    const result = bridgeCoreProxy.topicRegistered(event.topic);
    expect(result).toBeTruthy();
  });

  it('should be able to return false when event not exists', () => {
    const result = bridgeCoreProxy.topicRegistered(event.topic);
    expect(result).toBeFalsy();
  });
});
