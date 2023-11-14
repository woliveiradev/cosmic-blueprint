import { Event } from '../event/event.bus';

export interface EventAction {
  run(event: Event): Promise<void>;
}

export type ActionFilter<EventMessage = unknown> = (
  event: Event<EventMessage>,
) => boolean;

export interface BusAction {
  action: EventAction;
  filter?: ActionFilter;
}
