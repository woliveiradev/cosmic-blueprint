import { EventAction } from '../types';

export class EventActionStub implements EventAction {
  async run(): Promise<void> {
    return;
  }
}
