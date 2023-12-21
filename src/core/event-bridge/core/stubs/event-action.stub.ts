import { EventAction } from '../types';

export class EventActionStub implements EventAction {
  readonly name = EventActionStub.name;

  async run(): Promise<void> {
    return;
  }
}
