import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BusCoreProxy } from './core-proxy.bus';
import { BusCore } from './core.bus';
import { Event } from '../event/event.bus';
import { InvalidTopicFormat } from './exceptions/invalid-topic-format.exception';
import { TopicNotRegistered } from './exceptions/topic-not-registered.exception';
import { EventActionStub } from './stubs/event-action.stub';
import { EventAction } from './types';

let event: Event;
let busCore: BusCore;
let busCoreProxy: BusCoreProxy;
let eventActionStub: EventAction;

beforeEach(() => {
  event = new Event('Test.EventEmitted', {});
  busCore = new BusCore();
  busCoreProxy = new BusCoreProxy(busCore);
  eventActionStub = new EventActionStub();
});

describe('Bus Core Proxy Validate Register Route', () => {
  it('should not be able to forward a register when trying register a new topic without split character (.)', () => {
    const invalidTopic = 'invalid format';
    expect(() =>
      busCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when trying register a new topic with many split character (.)', () => {
    const invalidTopic = 'Many.Split.Character';
    expect(() =>
      busCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when main topic is not PascalCase', () => {
    const invalidTopic = 'test.InvalidMainTopic';
    expect(() =>
      busCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should not be able to forward a register when sub topic is not PascalCase', () => {
    const invalidTopic = 'Test.invalid-sub-topic';
    expect(() =>
      busCoreProxy.register(invalidTopic, eventActionStub),
    ).toThrowError(new InvalidTopicFormat());
  });

  it('should be able to forward a register when sub topic is wildcard', () => {
    const validTopic = 'Test.*';
    const registerSpy = vi.spyOn(busCore, 'register');
    const result = busCoreProxy.register(validTopic, eventActionStub);
    expect(result).toBeUndefined();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should be able to forward a register when main topic and sub topic have valid formats ', () => {
    const validTopic = 'Test.ValidTopic';
    const registerSpy = vi.spyOn(busCore, 'register');
    const result = busCoreProxy.register(validTopic, eventActionStub);
    expect(result).toBeUndefined();
    expect(registerSpy).toHaveBeenCalled();
  });
});

describe('Bus Core Proxy Validate Publish Event', () => {
  it('should not be able to forward a event publish when topic is not registered', () => {
    expect(() => busCoreProxy.publish(event)).toThrowError(
      new TopicNotRegistered(event.topic),
    );
  });

  it('should be able to forward a event publish when topic exists', () => {
    const actionSpy = vi.spyOn(busCore, 'publish');
    busCoreProxy.register(event.topic, eventActionStub);
    busCoreProxy.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });
});

describe('Bus Core Proxy Validate Topic State', () => {
  it('should be able to return true when event already has registered', () => {
    busCoreProxy.register(event.topic, eventActionStub);
    const result = busCoreProxy.topicRegistered(event.topic);
    expect(result).toBeTruthy();
  });

  it('should be able to return false when event not exists', () => {
    const result = busCoreProxy.topicRegistered(event.topic);
    expect(result).toBeFalsy();
  });
});
