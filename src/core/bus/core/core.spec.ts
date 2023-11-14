import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BusCore } from './core.bus';
import { Event } from '../event/event.bus';
import { EventActionStub } from './stubs/event-action.stub';
import { EventAction } from './types';

let event: Event;
let eventActionStub: EventAction;
let busCore: BusCore;

beforeEach(() => {
  event = new Event('Test.EventEmitted', {});
  busCore = new BusCore();
  eventActionStub = new EventActionStub();
});

describe('Bus Core Register Route', () => {
  it('should be able to register a topic when sending valid topic format', () => {
    const validTopic = 'Test.EventEmitted';
    const result = busCore.register(validTopic, eventActionStub);
    expect(busCore.topicRegistered(validTopic)).toBeTruthy();
    expect(result).toBeUndefined();
  });
});

describe('Bus Core Publish Event', () => {
  it('should be able to run a action without filter', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    busCore.register(event.topic, eventActionStub);
    busCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should be able to run a action when registed topic contains wildcard', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    busCore.register('Test.*', eventActionStub);
    busCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should be able to run a action when a filter event returns true', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    const eventActionFilter = vi.fn(() => true);
    busCore.register(event.topic, eventActionStub, eventActionFilter);
    busCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should not be able to run a action when a filter event returns false', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    const eventActionFilter = vi.fn(() => false);
    busCore.register(event.topic, eventActionStub, eventActionFilter);
    busCore.publish(event);
    expect(actionSpy).not.toHaveBeenCalled();
  });
});

describe('Bus Core Topic Registered', () => {
  it('should be able to return true when registered topic contains a wildcard', () => {
    const registeredTopic = 'Test.*';
    busCore.register(registeredTopic, eventActionStub);
    const result = busCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });

  it('should be able to return true when registered topic is exactly the same', () => {
    const registeredTopic = 'Test.EventEmitted';
    busCore.register(registeredTopic, eventActionStub);
    const result = busCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });
});
