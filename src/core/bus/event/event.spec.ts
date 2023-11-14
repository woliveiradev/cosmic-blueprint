import { describe, expect, it } from 'vitest';
import { Event } from './event.bus';

describe('Base Event', () => {
  it('should have a common fields', () => {
    const event = new Event('tests:topic', {});
    expect(event).toHaveProperty('topic');
    expect(event).toHaveProperty('message');
    expect(event).toHaveProperty('metadata.idempotencyKey');
    expect(event).toHaveProperty('metadata.correlationId');
    expect(event).toHaveProperty('metadata.timestamp');
  });
});
