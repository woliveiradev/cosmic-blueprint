import { Entity } from './entity';
import { DomainEvent } from './event';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private events: DomainEvent[] = [];

  protected pushEvent(event: DomainEvent) {
    this.events.push(event);
  }

  public pullEvents(): DomainEvent[] {
    const events = this.events.slice();
    this.events = [];
    return events;
  }
}
